import { Link } from 'react-router-dom'

export const Logo = () => {
  return (
    <Link className="flex items-center text-white" to=".">
      {/* <img className="h-8 w-auto" src={logo} alt="Workflow" /> */}
      <span className="text-xl text-white font-semibold">Bulletproof React</span>
    </Link>
  )
}
