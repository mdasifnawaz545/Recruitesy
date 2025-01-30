

export default function loading() {
    return (
        <div className="w-full min-h-screen flex items-center justify-center backdrop-blur-lg">
            <div className="animate-bounce text-center duration-300 flex items-center justify-center">
                <img className="flex items-center justify-center text-center" src="https://res.cloudinary.com/dpqdgcipi/image/upload/v1737533670/image-removebg-preview_1_gl5lis.png" width={300} height={50} alt="Loading..." />
            </div>

        </div>
    )
}
