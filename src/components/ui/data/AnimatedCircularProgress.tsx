import { cn } from "@/lib/utils";

interface AnimatedCircularProgressProps {
    max?: number;
    min?: number;
    value: number;
    className?: string;
}

const AnimatedCircularProgress = ({
    value,
    className,
    max = 100,
    min = 0
}:AnimatedCircularProgressProps) => {
    const circumference = 2 * Math.PI * 45
    const percentPx = circumference / 100
    const currentPercent = Math.round(((value - min) / (max - min)) * 100)
    
    let colorCircular:string;
    if(value >= max / 2)
        colorCircular = 'stroke-green-500';
    else if(value > (max * 0.1))
        colorCircular = 'stroke-yellow-500';
    else colorCircular = 'stroke-red-500';

    return (
        <div 
            className={cn("relative size-40 text-2xl font-semibold", className)}
            style={
            {
                "--circle-size": "100px",
                "--circumference": circumference,
                "--percent-to-px": `${percentPx}px`,
                "--gap-percent": "5",
                "--offset-factor": "0",
                "--transition-length": "1s",
                "--transition-step": "200ms",
                "--delay": "1s",
                "--percent-to-deg": "3.6deg",
                transform: "translateZ(0)",
            } as React.CSSProperties}
        >
            <svg
                fill="none"
                className={`size-full ${colorCircular}`}
                strokeWidth="2"
                viewBox="0 0 100 100"
            >

                <circle
                    cx="50"
                    cy="50"
                    r="45"
                    strokeWidth="10"
                    strokeDashoffset="0"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="opacity-100"
                    style={
                    {
                        "--stroke-percent": currentPercent,
                        strokeDasharray: "calc(var(--stroke-percent) * var(--percent-to-px)) var(--circumference)",
                        transition: "var(--transition-length) ease var(--delay),stroke var(--transition-length) ease var(--delay)",
                        transitionProperty: "stroke-dasharray,transform",
                        transform: "rotate(calc(-90deg + var(--gap-percent) * var(--offset-factor) * var(--percent-to-deg)))",
                        transformOrigin: "calc(var(--circle-size) / 2) calc(var(--circle-size) / 2)",
                    } as React.CSSProperties
                }
                />
            </svg>
            <span
                data-current-value={currentPercent}
                className="animate-in fade-in absolute inset-0 m-auto size-fit delay-[var(--delay)] duration-[var(--transition-length)] ease-linear"
            >
                {currentPercent}%
            </span>

        </div>
    )
}

export default AnimatedCircularProgress;