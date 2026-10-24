# Render son môi kiểu beauty-editorial (không logo) bằng numpy:
# thân đen bóng + ống vàng kim loại + đầu son đỏ satin vát chéo. Ánh sáng studio: softbox lớn trái, dải sáng hẹp phải.
import numpy as np
from PIL import Image, ImageFilter
import sys, os

SS = 2  # supersample
W, H = 700, 1800
K = 0.11  # độ dẹt elip (góc nhìn hơi từ trên)
CX = W / 2

def g(x, mu, s):
    return np.exp(-0.5 * ((x - mu) / s) ** 2)

def env_metal(phi):
    """Độ sáng môi trường phản chiếu theo góc ngang phi (radian)."""
    d = np.degrees(phi)
    e = (0.06 + 1.35 * g(d, -58, 12) + 1.0 * g(d, 34, 5) + 0.55 * g(d, 4, 7) + 0.22 * g(d, -20, 30)
            + 0.5 * g(np.abs(d), 165, 18))
    return np.clip(e - 0.25 * g(d, -28, 5) - 0.2 * g(d, 18, 4), 0, None)

def ramp(t, stops):
    """Nội suy màu theo các mốc [(t, (r,g,b)), ...]."""
    t = np.clip(t, 0, 1)
    out = np.zeros(t.shape + (3,))
    for (t0, c0), (t1, c1) in zip(stops[:-1], stops[1:]):
        m = (t >= t0) & (t <= t1)
        u = ((t - t0) / max(t1 - t0, 1e-6))[m][:, None]
        out[m] = np.array(c0) * (1 - u) + np.array(c1) * u
    return out

GOLD = [(0.0, (38, 22, 6)), (0.14, (110, 72, 22)), (0.36, (198, 152, 74)), (0.6, (240, 208, 140)), (0.82, (255, 240, 205)), (1.0, (255, 253, 240))]

def render(tip=(176, 16, 30), tip_dark=(64, 4, 12), body='black', out='lipstick_hero.png', size=None):
    w, h = W * SS, H * SS
    ys, xs = np.mgrid[0:h, 0:w].astype(np.float64) / SS
    X = xs - CX
    img = np.zeros((h, w, 3))
    alpha = np.zeros((h, w))
    rng = np.random.default_rng(7)
    noise = rng.normal(0, 1, (h, w))
    noise = np.asarray(Image.fromarray(((noise * 20) + 128).clip(0, 255).astype(np.uint8)).filter(ImageFilter.GaussianBlur(1.2)), np.float64) / 128 - 1

    def cyl(r, y_top, y_bot):
        inside = np.abs(X) < r
        s = np.sqrt(np.clip(1 - (X / r) ** 2, 0, 1))
        top = y_top + K * r * s
        bot = y_bot + K * r * s
        m = inside & (ys >= top) & (ys <= bot)
        nx = np.clip(X / r, -1, 1)
        phi = 2 * np.arcsin(nx)
        v = (ys - top) / np.maximum(bot - top, 1)
        return m, nx, phi, v, top, bot

    def paint(m, col, a=1.0):
        img[m] = col[m] if col.ndim == 3 else col
        alpha[m] = a

    # 1) Thân dưới
    r_body = 250
    m, nx, phi, v, top, bot = cyl(r_body, 1160, 1730)
    E = env_metal(phi)
    if body == 'black':
        base = np.array([16, 14, 15], float)
        spec = np.clip(E, 0, 1.4) ** 1.6
        col = base[None, None, :] * (1 - 0.3 * np.abs(nx))[..., None] + spec[..., None] * np.array([200, 196, 198]) * 0.82
        col += (g(nx, 0.96, 0.03) * 90)[..., None]
        # gradient dọc nhẹ + tối dần ở đáy
        col *= (1.0 - 0.18 * v ** 3)[..., None]
    else:
        col = ramp(np.clip(E, 0, 1.2) / 1.2, GOLD)
    col += noise[..., None] * 2.5
    paint(m, col)
    # vát cạnh đáy
    edge = m & (ys > bot - 10)
    img[edge] *= 0.6

    # 2) Vòng vàng (band) có rãnh
    m, nx, phi, v, top, bot = cyl(r_body + 5, 1095, 1165)
    E = env_metal(phi)
    col = ramp(np.clip(E * (0.85 + 0.25 * np.sin(v * np.pi)), 0, 1.25) / 1.25, GOLD)
    groove = (np.abs(v - 0.28) < 0.05) | (np.abs(v - 0.72) < 0.05)
    col[groove] *= 0.55
    col += noise[..., None] * 3
    paint(m, col)

    # 3) Ống vàng trên
    r_sl = 236
    m, nx, phi, v, top, bot = cyl(r_sl, 640, 1100)
    E = env_metal(phi) * (0.92 + 0.12 * (1 - v))
    col = ramp(np.clip(E, 0, 1.25) / 1.25, GOLD)
    col += noise[..., None] * 3
    paint(m, col)
    # bóng tối nhẹ ngay dưới mép trên (AO)
    ao = m & (ys < top + 14)
    img[ao] *= 0.8

    # 4) Mặt trên ống (elip) — vành vàng + lỗ tối quanh thỏi son
    yc = 640
    ell = (X / r_sl) ** 2 + ((ys - yc) / (K * r_sl)) ** 2 <= 1
    r_hole = 205
    hole = (X / r_hole) ** 2 + ((ys - yc + 2) / (K * r_hole)) ** 2 <= 1
    rim = ell & ~hole
    nxr = np.clip(X / r_sl, -1, 1)
    col = ramp(np.clip(env_metal(2 * np.arcsin(nxr)) * 0.9 + 0.25, 0, 1.25) / 1.25, GOLD)
    paint(rim, col)
    img[hole] = np.array([28, 18, 10])
    alpha[hole] = 1

    # 5) Thỏi son (bullet) vát chéo
    rb = 184
    inside = np.abs(X) < rb
    s = np.sqrt(np.clip(1 - (X / rb) ** 2, 0, 1))
    nxb = np.clip(X / rb, -1, 1)
    slant = 95 + (X + rb) / (2 * rb) * 270  # cao bên trái, thấp bên phải
    kf = 0.30
    face_top = slant - kf * rb * s
    face_bot = slant + kf * rb * s
    body_bot = yc + K * rb * s
    # thân trụ của thỏi son
    mb = inside & (ys >= face_bot) & (ys <= body_bot)
    L = np.array([-0.62, 0.0, 0.78]); L /= np.linalg.norm(L)
    nz = np.sqrt(1 - nxb ** 2)
    d = np.clip(nxb * L[0] + nz * L[2], 0, 1) ** 1.6
    tipc = np.array(tip, float); tipd = np.array(tip_dark, float)
    col = tipd[None, None] * (1 - d[..., None]) + tipc[None, None] * d[..., None]
    sheen = 0.7 * g(nxb, -0.48, 0.09) + 0.25 * g(nxb, -0.2, 0.2) + 0.3 * g(nxb, 0.7, 0.04)
    col = col + sheen[..., None] * (np.array([255, 190, 190]) - col) * 0.9
    col *= (0.93 + 0.07 * (ys - face_bot) / np.maximum(body_bot - face_bot, 1))[..., None]
    col += noise[..., None] * 3
    paint(mb, col)
    # mặt vát
    mf = inside & (ys >= face_top) & (ys < face_bot)
    u = (ys - face_top) / np.maximum(face_bot - face_top, 1)  # 0: mép sau, 1: mép trước
    lum = 0.62 + 0.38 * (1 - (X + rb) / (2 * rb)) * 0.8 + 0.12 * (1 - u)
    colf = tipd[None, None] * (1 - lum[..., None]) + np.array(tip, float)[None, None] * lum[..., None] * 1.12
    streak = 0.35 * g(X, -60 + 40 * (u - 0.5), 38) * (1 - u)
    colf = colf + streak[..., None] * (np.array([255, 200, 200]) - colf)
    colf += noise[..., None] * 3
    paint(mf, colf)
    # viền sáng mép trước mặt vát (cạnh sắc)
    ridge = inside & (np.abs(ys - face_bot) < 2.2)
    img[ridge] = img[ridge] * 0.5 + np.array([255, 170, 170])[None, :] * 0.5 * (0.4 + 0.6 * (nxb[ridge] < 0.3))[:, None]

    img = np.clip(img, 0, 255)
    rgba = np.dstack([img, alpha * 255]).astype(np.uint8)
    im = Image.fromarray(rgba, 'RGBA').resize((W, H), Image.LANCZOS)
    bbox = im.getbbox()
    im = im.crop((bbox[0] - 4, bbox[1] - 4, bbox[2] + 4, bbox[3] + 4))
    if size:
        im = im.resize(size, Image.LANCZOS)
    im.save(out)
    return im

if __name__ == '__main__':
    od = sys.argv[1] if len(sys.argv) > 1 else '.'
    os.makedirs(od, exist_ok=True)
    hero = render(out=f'{od}/lipstick_hero.png')
    print('hero', hero.size)
    shades = {
        'nude': ((198, 128, 108), (96, 52, 42)),
        'pink': ((214, 86, 122), (98, 24, 50)),
        'coral': ((232, 96, 72), (110, 30, 20)),
        'plum': ((118, 34, 62), (46, 8, 22)),
    }
    for k, (c, cd) in shades.items():
        render(tip=c, tip_dark=cd, out=f'{od}/lipstick_{k}.png')
    render(body='gold', out=f'{od}/lipstick_gold.png')
    print('done')
