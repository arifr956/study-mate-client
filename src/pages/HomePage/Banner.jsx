import Carousel from "nuka-carousel";
import { Link } from "react-router-dom";

const Banner = () => {
    const slides = [
        {
            image: "https://i.ibb.co/hWnz30t/digital-education-platform-web-banner-design-student-access-online-education-platform-on-laptop-and.jpg",
            title: "Online Group Study Made Easy",
        },
        {
            image: "https://i.ibb.co/zswB0Wk/digital-learning-web-banner-design-students-study-with-mobile-phone-during-online-class-online-educa.jpg",
            title: "Join the Future of Collaborative Learning",
        },
        {
            image: "https://i.ibb.co/10vMbTY/images.jpg",
            title: "Study Together, Succeed Together",
        },
        {
            image: "https://i.ibb.co/z5rK93M/investment-in-education-concept-web-banner-design-free-vector.jpg",
            title: "Enhance Your Knowledge with Group Study",
        },
    ];


    return (
        <Carousel
            autoplay={true}
            wrapAround={true}
            renderCenterLeftControls={({ previousSlide }) => (
                <button onClick={previousSlide}>Previous</button>
            )}
            renderCenterRightControls={({ nextSlide }) => (
                <button onClick={nextSlide}>Next</button>
            )}
        >
            {slides.map((slide, index) => (
                <div
                    key={index}
                    className="hero h-80 lg:h-96"
                    style={{
                        backgroundImage: `url(${slide.image})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                    }}
                >
                    <div className="hero-overlay bg-opacity-40"></div>
                    <div className="hero-content text-center text-neutral-content">
                        <div className="max-w-md">
                            <h1 className="mb-7 text-5xl font-bold text-white">
                                {slide.title}
                            </h1>
                            <Link to="/registration">
                                <button className="btn btn-primary text-white bg-red-400 border-0">
                                    Register Now
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>
            ))}
        </Carousel>
    );
};

export default Banner;
