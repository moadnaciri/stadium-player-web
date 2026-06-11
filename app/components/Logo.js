export default function Logo({ size = 36 }) {
  return (
    <img
      src="/stadium-logo.png"
      alt="StadiumPlayer"
      width={size}
      height={size}
      style={{ width: size, height: size }}
      className="rounded-xl"
    />
  )
}
