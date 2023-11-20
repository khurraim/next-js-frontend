import React from "react";
import Footer from "./Footer";

function Footerbar()
{
    return (
        
        <footer className="custom-footer-second">
            <div className="row">
                <div className="col-md-4">Good Girls Gone Bad © 2023</div>
                <div className="col-md-4 text-center payment-cards">
                {/* <i class="fab fa-cc-visa"></i>
                <i class="fab fa-cc-mastercard"></i>
                <i class="fab fa-cc-jcb"></i> */}
                <img src="/images/payment-dark.png" alt />
                </div>
                <div className="col-md-4">
                <div className="text-end">
                    terms &amp; conditions
                </div>
                </div>
            </div>
        </footer>
        
    )
}

export default Footerbar;