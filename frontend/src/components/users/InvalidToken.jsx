import { ShieldOff } from "lucide-react"
import {Link} from "react-router-dom"

const InvalidToken = () => {
  return (
    <div className="flex items-center justify-center flex-col">
      <ShieldOff className="size-60 " />
      <h2 className="h2-text text-5xl mt-10">Invalid or expired reset token</h2>
      <p className="h2-text text-2xl">The token you provided is either invalid or has expired. Please request a new password reset link.</p>
      <Link to="/forgot-password">
      <button className="main-btn w-[220px]">
      Request New Link
      </button>
      </Link>
      
      </div>
  )
}

export default InvalidToken