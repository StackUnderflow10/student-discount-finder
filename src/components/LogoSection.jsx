import { logoIconsList } from "../constants"

const LogoIcon = ({ icon }) => {
  return (
    <div className="flex-none flex-center marquee-item">
      <img src={icon.imgPath} alt={icon.name} className="max-h-12 w-auto object-contain" />
    </div>
  )
}
const LogoSection = () => {
  return (
    <div className="md:my-10 my-5 relative">
      <div className="gradient-edge-left" />
      <div className="gradient-edge-right" />

      <div className="marquee h-52">
        <div className="marquee-box md:gap-12 gap-5">
          {logoIconsList.map((icon, index) => (
            <LogoIcon key={`${icon.name}-${index}`} icon={icon} />
          ))}
          {logoIconsList.map((icon, index) => (
            <LogoIcon key={`${icon.name}-duplicate-${index}`} icon={icon} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default LogoSection
