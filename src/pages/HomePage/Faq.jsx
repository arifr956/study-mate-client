import { useEffect } from "react";
import AOS from 'aos';
import 'aos/dist/aos.css';

const faqs = [
    {
        question: "How can online group study websites benefit me?",
        answer: "Online group study websites provide a platform for collaborative learning, allowing you to share knowledge, discuss topics, and gain a deeper understanding of your subjects with peers.",
    },
    {
        question: "What are the advantages of studying in a group online?",
        answer: "Studying in a group online promotes engagement, fosters teamwork, and helps you clarify doubts. It also offers diverse perspectives and enhances your problem-solving skills.",
    },
    {
        question: "How can I make the most of online group study websites?",
        answer: "To maximize the benefits, actively participate, contribute your knowledge, and take advantage of the resources and tools available. Set clear goals and schedules for effective group study.",
    },
];

const styles = {
    card: {
        backgroundColor: '#FCE7F3', // Change the background color
        border: '2px solid #FF6B95', // Change the border style and color
        borderRadius: '10px',
        padding: '20px',
    },
};


const Faq = () => {
    useEffect(() => {
        AOS.init({
            duration: 1000,
            once: true,
        });
    }, []);

    return (
        <div>
            <h1 className="text-3xl font-bold text-center my-5">
                <span className="bg-gradient-to-r from-cyan-500 to-blue-500 text-transparent bg-clip-text">FAQs about Online Group Study Website Benefits</span>
            </h1>
            <h3 className="text-lg text-slate-400 mb-8 text-center font-semibold">
                Explore the advantages of using online group study websites for your learning journey.
            </h3>

            <div className="p-10 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {faqs.map((faq, index) => (
                    <div
                        key={index}
                        data-aos="flip-left"
                        style={styles.card}
                        className="flex flex-col max-w-md align-center justify-between"
                    >
                        <div className="flex flex-col space-y-5">
                            <p className="body-medium m-0 dark:text-dark-contrastText" style={{ hyphens: 'auto' }}>
                                <strong>{faq.question}</strong>
                                <br />
                                {faq.answer}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};


export default Faq;