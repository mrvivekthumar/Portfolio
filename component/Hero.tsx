import React from 'react'

const Hero = () => {
    return (
        <div className="flex flex-col items-center justify-center py-20">
            <div className="rounded-full overflow-hidden w-40 h-40 mb-4">
                {/* <Image src="/images/profile.jpg" alt="Piyush Garg" width={160} height={160} /> */}
            </div>
            <h1 className="text-4xl font-bold mb-4">I'm Vivek Thumar</h1>
            <p className="text-xl text-center max-w-2xl mb-8">
                Hi there! My name is Vivek thumar and I'm a software engineer.  I love all things tech and coding.
            </p>
            <a
                href="https://discord.com/invite/your-server-link"
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
                Join Discord Server
            </a>
        </div>
    )
}

export default Hero