import Image from 'next/image';

export default function FollowMe() {
  return <>
    <h2 class="text-2xl font-semibold mt-6 mb-4">关注我</h2>
    <p>如果觉得本教程对你有帮助，欢迎关注我的社交媒体账号。</p>

    {/* TODO: 将社交媒体二维码图片放到 public/ 目录后，取消下方注释并更新 src 和文字说明 */}
    {/* <div class="flex mt-5">
      <div class="w-1/2 items-center flex flex-col pr-2">
        <Image
          src="/qrcode-1.png"
          className="mb-4 rounded-md shadow-lg"
          alt="扫码关注"
          width={200}
          height={200}
        />
        <p class="nx-text-xs font-bold text-center">扫码关注</p>
      </div>
      <div class="w-1/2 items-center flex flex-col pl-2">
        <Image
          src="/qrcode-2.png"
          className="mb-5 rounded-md shadow-lg"
          alt="扫码关注"
          width={200}
          height={200}
        />
        <p class="nx-text-xs font-bold text-center">扫码关注</p>
      </div>
    </div> */}
  </>
}
