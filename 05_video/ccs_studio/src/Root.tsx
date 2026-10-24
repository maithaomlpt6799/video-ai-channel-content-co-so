import { Composition, Folder } from "remotion";
import { z } from "zod";
import { Ep01, ep01Duration } from "./channel/ep01/Ep01";
import { EPISODE as EP01 } from "./channel/ep01/script";
import { Ep01v2, EP01V2, HookPreview } from "./ep01c/Ep01v2";
import { CoverStill } from "./ep01c/CoverOptions";
import { VIDEO } from "./tiktok3ce/config";
import { totalDuration } from "./tiktok3ce/timeline";
import {
  TikTok3CEVideoToLive,
  tiktok3ceSchema,
} from "./tiktok3ce/TikTok3CEVideoToLive";

// Mỗi <Composition> là một mục trong thanh bên trái của Remotion Studio.
export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Folder name="Kenh-Content">
        <Composition id={EP01V2.id} component={Ep01v2} durationInFrames={EP01V2.duration} fps={30} width={1080} height={1920} />
        <Composition id="Ep01-HookPreview-A" component={HookPreview} defaultProps={{ variant: "A" as const }} durationInFrames={150} fps={30} width={1080} height={1920} />
        <Composition id="Ep01-HookPreview-B" component={HookPreview} defaultProps={{ variant: "B" as const }} durationInFrames={130} fps={30} width={1080} height={1920} />
        <Composition id="Ep01-Cover-A" component={CoverStill} defaultProps={{ v: "A" as const }} durationInFrames={1} fps={30} width={1080} height={1920} />
        <Composition id="Ep01-Cover-B" component={CoverStill} defaultProps={{ v: "B" as const }} durationInFrames={1} fps={30} width={1080} height={1920} />
        <Composition id="Ep01-Cover-C" component={CoverStill} defaultProps={{ v: "C" as const }} durationInFrames={1} fps={30} width={1080} height={1920} />
        <Composition
          id={EP01.id}
          component={Ep01}
          schema={z.object({ showDraftBadge: z.boolean() })}
          durationInFrames={ep01Duration(30)}
          fps={30}
          width={1080}
          height={1920}
          defaultProps={{ showDraftBadge: true }}
        />
      </Folder>
      <Folder name="Campaign">
        <Composition
          id={VIDEO.id}
          component={TikTok3CEVideoToLive}
          schema={tiktok3ceSchema}
          durationInFrames={totalDuration(VIDEO.fps)}
          fps={VIDEO.fps}
          width={VIDEO.width}
          height={VIDEO.height}
          defaultProps={{ showSafeArea: false, showDraftBadge: true }}
        />
      </Folder>
    </>
  );
};
