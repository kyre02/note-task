import {Check, X} from "lucide-react";

const PasswordCriteria = ({password}) => {
    const criteria =[
        {label: "At least 6 charaters", met: password.length >= 6},
        {label: "Contains uppercase letter", met: /[A-Z]/.test(password)},
        {label: "Contains lowercase letter", met: /[a-z]/.test(password)},
        {label: "Contains a number", met: /\d/.test(password)},
        {label: "Contains a special character", met: /[^A-Za-z0-9]/.test(password)}
    ];
    return  (
        <div className="mt-2 space-y-1">
            {criteria.map((item) => (
                <div key={item.label} className="flex items-center text-text text-sm lg:text-base">
                    {item.met ? (
                        <Check className="size-4 text-blue-500 mr-2" />
                    ) : (
                        <X className="size-4 text-text mr-2" />
                    )}
                    <span className={item.met ? "text-blue-500" : "text-text"}>
                        {item.label}
                        </span>
                    </div>
            ))}
        </div>
    )
}

const PasswordStrength = ({password}) => {
    const getStrength = (pass) => {
        let strength = 0; 
        if (pass.length >= 6) strength ++;
        if (pass.match(/[A-Z]/) && pass.match(/[a-z]/)) strength ++;
        if (pass.match(/\d/)) strength ++;
        if (pass.match(/[^A-zA-Z\d]/)) strength ++;

        return strength;
    };
    const strength = getStrength(password);

		const getColor = (strength) => {
			if (strength === 0) return "bg-red-500";
			if (strength === 1) return "bg-red-400";
			if (strength === 2) return "bg-yellow-500";
			if (strength === 3) return "bg-yellow-400";
			return "bg-cyan-500";
		}

    const getStrengthText = (strength) => {
        if (strength === 0) return "Very Weak" ;
        if (strength === 1) return "Weak";
        if (strength === 2) return "Fair";
        if (strength === 3) return "Good";
        return "Strong";
    };

    const getStrengthTextColor = (strength) => {
      if (strength === 0) return "text-red-500" ;
      if (strength === 1) return "text-red-400";
      if (strength === 2) return "text-yellow-500";
      if (strength === 3) return "text-yellow-400";
      return "text-cyan-400";
  };


  return (
    <div className="mt-2">
        <div className="flex justify-between items-center mb-1">
            <span className="text-sm text-text"> Password Strength</span>
            <span className={`text-sm text-text ${getStrengthTextColor(strength)}`}>{getStrengthText(strength)}</span>
				</div>

        
            <div className="flex space-x-1">
							{[... Array(4)].map((_, index) => (
								<div
									key={index}
									className={`h-1 w-1/4 round-full transition-colors duration-300
									${index < strength ? getColor(strength) : "bg-gray-300"}`}	
								/>
							))}
            </div>
					<PasswordCriteria password={password} />
    </div>
  )
}

export default PasswordStrength