const Zhenhao = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    width={24}
    height={24}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <rect
      x="2"
      y="2"
      width="20"
      height="20"
      rx="5"
      className="fill-brand/20 stroke-brand"
      strokeWidth="1.5"
    />
    <text
      x="12"
      y="16.5"
      textAnchor="middle"
      className="fill-brand text-[11px] font-bold"
      style={{ fontFamily: "system-ui, sans-serif" }}
    >
      真
    </text>
  </svg>
);

export default Zhenhao;
