import { useEffect, useState } from "react"

export const Greeting = () => {
    const currentTime = new Date()
    const currentHour = currentTime.getHours()
    const [greeting, setGreeting] = useState("")

    useEffect(() => {
        if (currentHour >= 5 && currentHour < 12) {
            setGreeting("Good morning");
          } else if (currentHour >= 12 && currentHour < 18) {
            setGreeting("Good afternoon");
          } else {
            setGreeting("Good night");
          }
    }, []) // Added closing parenthesis and empty dependency array

    return (
        <h1 className="text-3xl font-bold">{greeting}</h1>
    )
}

export default Greeting;