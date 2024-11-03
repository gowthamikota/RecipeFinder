import React from 'react';
import './home.css';

const Home = () => {
    return (
        <div className="home-container">
            <header className="header">
                <h1>CookBook 🍽️</h1>
                <nav className="nav-links">
                    <a href="#about">About Us</a>
                    <a href="#features">Features</a>
                    <a href="#contact">Contact</a>
                
                </nav>
                <section className='usermain'>

                
                <a href="/signup" >Sign Up</a>
                <a href="/signin" >Sign In</a>
                </section>
            </header>
            <section className="main-section" id='about'>
                <h2>Welcome to Our Cookbook! 🌟</h2>
                <p>Unlock the Secrets of Deliciousness—Join Our Cookbook Community!</p>
                <section className='user'>
                <a href="/signup" className="header-link">Sign Up</a>
                <a href="/signin" className="header-link">Sign In</a>
                </section>
            </section>
            <section className="about-us">
    <h2>About Us</h2>
    <p>Welcome to <span className="highlight">Cookbook</span>, your ultimate destination for culinary inspiration and creativity! We are a vibrant community of food enthusiasts committed to sharing the joy of cooking with everyone.</p>
    
    
    <p>Founded by passionate cooks and food lovers, <span className="highlight">Cookbook</span> was born out of the desire to create a platform that connects people through the love of food. Our journey began in a small kitchen, where recipes were shared among friends and family, igniting the spark for a larger community.</p>
    
    
    <p>We envision a world where everyone has the confidence and resources to cook delicious meals, experiment with flavors, and enjoy the process of creating. Cooking is not just a task; it's an art form, a way to express love, and a means to bring people together.</p>
    
    <h3>Join Our Community</h3>
    <p>At <span className="highlight">Cookbook</span>, we believe that every recipe tells a story. Whether you’re here to explore new cuisines, share your culinary creations, or connect with fellow food lovers, we invite you to join us in this delicious journey. Together, let's celebrate the art of cooking and inspire one another!</p>
    <div className="call-to-action">
        <p>Ready to dive in? <br></br><br></br><a href="/signup" className="cta-link">Sign Up Now!</a></p>
    </div>
</section>

<section className="features" id='features'>
    <h2>What We Offer</h2>
    <div className="features-container">
        <div className="feature-card">
           
            <h3>Recipe Sharing</h3>
            <img src="https://i.pinimg.com/236x/74/b9/55/74b955513795417b28ec3e1a36c7ae0a.jpg" alt="Recipe Sharing" className="feature-image" />
            <p>Share your favourite recipes with our community and discover new ones from passionate cooks around the world.</p>
        </div>
        <div className="feature-card">
            
            <h3>Culinary Community</h3>
            <img src="https://i.pinimg.com/236x/4a/99/c1/4a99c1f0b45041552208bd1ab5127f8d.jpg" alt="Culinary Community" className="feature-image" />
            <p>Join a vibrant community of food lovers where you can connect, collaborate, and share your culinary adventures.</p>
        </div>
        <div className="feature-card">
          
            <h3>Personalized Meal Plans</h3>
            <img src="https://i.pinimg.com/236x/89/d0/36/89d036bc4157a5dcad9b29b952716529.jpg" alt="Personalized Meal Plans" className="feature-image" />
            <p>Get customized meal plans based on your dietary preferences and nutritional goals to make cooking easier and healthier.</p>
        </div>
        <div className="feature-card">
         
            <h3>Interactive Cooking Classes</h3>
            <img src="https://i.pinimg.com/236x/80/97/b5/8097b5a5fdcc2434493304dea031b3d6.jpg" alt="Interactive Cooking Classes" className="feature-image" />
            <p>Participate in live cooking classes led by expert chefs and improve your culinary skills from the comfort of your home.</p>
        </div>
        <div className="feature-card">
            

            <h3>Recipe Rating & Reviews</h3>
            <img src="https://i.pinimg.com/236x/5c/e0/48/5ce048e18b958a1b37bdddb2a44079b5.jpg" alt="Recipe Rating & Reviews" className="feature-image" />
            <p>Rate and review recipes to help others in the community find the best dishes to try and enjoy.</p>
        </div>
        <div className="feature-card">
            
            <h3>Advanced Search Filters</h3>
            <img src="https://i.pinimg.com/236x/85/de/9a/85de9a7df4bd8936fc5de35a756a00c5.jpg" alt="Advanced Search Filters" className="feature-image" />
            <p>Easily find recipes based on ingredients, cuisine, dietary restrictions, and more with our advanced search options.</p>
        </div>
    </div>
</section>
<section className="contact" id='contact'>
    <h2>Get in Touch with Us!</h2>
    <p>We'd love to hear from you! Whether you have questions, suggestions, or just want to share your culinary experiences, feel free to reach out.</p>
    <div className="info">

   
    <div className="contact-info">
        <h3>Contact Information</h3>
        <p><strong>Email:</strong> support@cookbook.com</p>
        <p><strong>Phone:</strong> +1 (555) 012-3456</p>
        <p><strong>Address:</strong> 123 Culinary Lane, Foodie City, FC 12345</p>
    </div>

    <form className="contact-form">
        <h3>Send Us a Message</h3>
        <div className="form-group">
            <label htmlFor="name">Name:</label>
            <input type="text" id="name" name="name" required />
        </div>
        <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input type="email" id="email" name="email" required />
        </div>
        <div className="form-group">
            <label htmlFor="message">Message:</label>
            <textarea id="message" name="message" rows="4" required></textarea>
        </div>
        <button type="submit" className="submit-button">Submit</button>
    </form>
    </div>
</section>

            <footer className="footer">
                <p>© 2024 Cookbook. All Rights Reserved.</p>
            </footer>
        </div>
    );
};

export default Home;
