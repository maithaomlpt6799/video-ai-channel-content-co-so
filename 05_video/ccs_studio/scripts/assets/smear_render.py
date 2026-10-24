# Vệt son đỏ (swatch/smear) kiểu beauty editorial — bề mặt kem bóng, sợi cọ, đuôi khô xơ.
import numpy as np
from PIL import Image, ImageFilter
import sys

from scipy.ndimage import gaussian_filter
def blur(a, r):
    return gaussian_filter(np.asarray(a, float), r)

def smear(out, w=1800, h=760, base=(170, 14, 28), seed=3):
    rng = np.random.default_rng(seed)
    ys, xs = np.mgrid[0:h, 0:w].astype(float)
    x0, x1 = 140, w - 120
    t = np.clip((xs - x0) / (x1 - x0), 0, 1)
    cy = h * 0.52 + 70 * np.sin(t * 2.6 + 0.4) - 40 * t
    # bề rộng: phình ở đầu (chỗ đặt son), thon dần, đuôi xơ
    width = 300 * (1.05 - 0.45 * t)
    d = (ys - cy) / np.maximum(width / 2, 1)  # -1..1 theo bề ngang vệt
    # nhiễu mép
    edge_n = blur(rng.normal(0, 1, (h, w)), 6) * 0.9
    edge_n2 = blur(rng.normal(0, 1, (h, w)), 1.5) * 0.25
    m = (np.abs(d) < 1 + 0.25 * edge_n + 0.15 * edge_n2) & (xs > x0 - 40)
    # đầu tròn
    head = ((xs - x0) / 150) ** 2 + ((ys - cy) / 160) ** 2 < 1 + 0.2 * edge_n
    m = m | head
    # sợi cọ: nhiễu dọc theo bề ngang, kéo dài theo trục x
    strand = rng.normal(0, 1, (h, 1)) * np.ones((1, w))
    strand = blur(strand, (2.2, 0.01))
    strand = strand / (strand.std() + 1e-9) * 0.45
    # đuôi khô: các sợi biến mất dần
    dry = np.clip((t - 0.5 + 0.12 * blur(rng.normal(0, 1, (h, w)), 25) * 8) / 0.5, 0, 1) ** 1.3
    gap = strand + 0.35 * blur(rng.normal(0, 1, (h, w)), 3)
    m = m & ~((dry > 0) & (gap < (dry * 1.4 - 0.55)))
    m = m & ~((t > 0.97) & (rng.random((h, w)) < (t - 0.97) * 30))
    mask = blur(m.astype(float), 1.0)
    # bản đồ độ dày: dày ở đầu và giữa, rìa mỏng + gờ kem
    lowf = blur(rng.normal(0, 1, (h, w)), 40) * 3
    thick = np.clip(1 - np.abs(d) ** 2, 0, 1) * (1.2 - 0.6 * t) * (1 + 0.25 * lowf) + 0.12 * strand + 0.35 * np.exp(-(((xs - x0) / 160) ** 2 + ((ys - cy) / 170) ** 2))
    ridge = np.exp(-((np.abs(d) - 0.9) / 0.1) ** 2) * 0.3 * np.clip((xs - x0) / 120, 0, 1)
    hm = blur((thick + ridge) * mask, 3.5)
    gy, gx = np.gradient(hm * 40)
    nz = 1 / np.sqrt(gx ** 2 + gy ** 2 + 1)
    nx, ny = -gx * nz, -gy * nz
    L = np.array([-0.45, -0.55, 0.7]); L /= np.linalg.norm(L)
    lam = np.clip(nx * L[0] + ny * L[1] + nz * L[2], 0, 1)
    Hh = (L + np.array([0, 0, 1])); Hh /= np.linalg.norm(Hh)
    spec = np.clip(nx * Hh[0] + ny * Hh[1] + nz * Hh[2], 0, 1) ** 60
    b = np.array(base, float)
    col = b[None, None] * (0.55 + 0.6 * lam[..., None])
    col += spec[..., None] * np.array([255, 220, 220]) * 0.85
    col *= (0.94 + 0.06 * strand[..., None])
    col = np.clip(col, 0, 255)
    rgba = np.dstack([col, np.clip(mask, 0, 1) * 255]).astype(np.uint8)
    im = Image.fromarray(rgba, 'RGBA')
    im = im.crop(im.getbbox())
    im.save(out)
    return im

if __name__ == '__main__':
    od = sys.argv[1]
    smear(f'{od}/smear_red.png')
    smear(f'{od}/smear_red_soft.png', base=(196, 40, 52), seed=9)
    print('ok')
