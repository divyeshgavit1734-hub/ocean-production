// ==========================================
// OCEAN PRODUCTION
// REGISTRATION FORM
// ==========================================


// ==========================================
// SUPABASE CONFIGURATION
// ==========================================

const SUPABASE_URL =
    "https://nepianzfbysukaoqqbxf.supabase.co";

const SUPABASE_KEY =
    "sb_publishable_vA6sXJTvJO5QWY6BPyH79g_muuyN9_8";


// Create Supabase connection
const db = window.supabase.createClient(
    SUPABASE_URL,
    SUPABASE_KEY
);


// ==========================================
// FORM ELEMENTS
// ==========================================

const form =
    document.getElementById("registrationForm");

const submitButton =
    document.getElementById("submitButton");

const formMessage =
    document.getElementById("formMessage");


// ==========================================
// SET MINIMUM EVENT DATE
// ==========================================

const eventDate =
    document.getElementById("eventDate");

const today =
    new Date().toISOString().split("T")[0];

if (eventDate) {
    eventDate.min = today;
}


// ==========================================
// FORM SUBMISSION
// ==========================================

form.addEventListener(
    "submit",
    async function(event) {

        event.preventDefault();

        formMessage.textContent = "";


        // ======================================
        // GET MOBILE NUMBER
        // ======================================

        const mobile =
            document
                .getElementById("mobile")
                .value
                .trim();


        if (!/^[0-9]{10}$/.test(mobile)) {

            formMessage.textContent =
                "Please enter a valid 10-digit mobile number.";

            return;
        }


        // ======================================
        // GET SELECTED SERVICES
        // ======================================

        const services = [];


        document
            .querySelectorAll(
                'input[name="service"]:checked'
            )
            .forEach(function(item) {

                services.push(item.value);

            });


        if (services.length === 0) {

            formMessage.textContent =
                "Please select at least one service.";

            return;
        }


        // ======================================
        // DISABLE SUBMIT BUTTON
        // ======================================

        submitButton.disabled = true;

        submitButton.textContent =
            "Submitting...";


        try {


            // ==================================
            // CREATE REGISTRATION ID
            // ==================================

            const registrationID =
                "OP-" +
                Date.now()
                    .toString()
                    .slice(-8);


            // ==================================
            // GET FORM DATA
            // ==================================

            const customer = {

                registration_id:
                    registrationID,


                full_name:
                    document
                        .getElementById("fullName")
                        .value
                        .trim(),


                mobile:
                    mobile,


                whatsapp:
                    document
                        .getElementById("whatsapp")
                        .value
                        .trim(),


                email:
                    document
                        .getElementById("email")
                        .value
                        .trim(),


                event_type:
                    document
                        .getElementById("eventType")
                        .value,


                event_date:
                    document
                        .getElementById("eventDate")
                        .value,


                event_time:
                    document
                        .getElementById("eventTime")
                        .value,


                venue:
                    document
                        .getElementById("venue")
                        .value
                        .trim(),


                city:
                    document
                        .getElementById("city")
                        .value
                        .trim(),


                guests:
                    document
                        .getElementById("guests")
                        .value
                        ?
                        parseInt(
                            document
                                .getElementById("guests")
                                .value
                        )
                        :
                        null,


                services:
                    services,


                budget:
                    document
                        .getElementById("budget")
                        .value,


                requirements:
                    document
                        .getElementById("requirements")
                        .value
                        .trim(),


                status:
                    "New"
            };


            // ==================================
            // SEND DATA TO SUPABASE
            // ==================================

            const { error } =
                await db
                    .from("registrations")
                    .insert([customer]);


            if (error) {

                console.error(
                    "Supabase error:",
                    error
                );

                throw error;
            }


            // ==================================
            // SHOW REGISTRATION NUMBER
            // ==================================

            const registrationNumber =
                document.getElementById(
                    "registrationNumber"
                );


            if (registrationNumber) {

                registrationNumber.textContent =
                    registrationID;
            }


            // ==================================
            // HIDE FORM
            // ==================================

            form.style.display = "none";


            // ==================================
            // SHOW SUCCESS BOX
            // ==================================

            const successBox =
                document.getElementById(
                    "successBox"
                );


            if (successBox) {

                successBox
                    .classList
                    .remove("hidden");
            }


            // ==================================
            // LAUNCH FIREWORKS
            // ==================================

            launchFireworks();


            // ==================================
            // SCROLL TO TOP
            // ==================================

            window.scrollTo({

                top: 0,

                behavior: "smooth"

            });


        } catch (error) {


            // ==================================
            // REGISTRATION ERROR
            // ==================================

            console.error(
                "Registration error:",
                error
            );


            formMessage.textContent =
                "Registration failed: " +
                (
                    error.message ||
                    "Unknown error"
                );


        } finally {


            // ==================================
            // RESTORE BUTTON
            // ==================================

            submitButton.disabled = false;

            submitButton.textContent =
                "Submit Registration";

        }

    }
);


// ==========================================
// PREMIUM FIREWORKS
// ==========================================

function launchFireworks() {

    const fireworks =
        document.getElementById("fireworks");


    if (!fireworks) {

        console.error(
            "Fireworks container not found."
        );

        return;
    }


    // Clear previous fireworks
    fireworks.innerHTML = "";


    // ======================================
    // FIREWORK COLORS
    // ======================================

    const colors = [

        "#ffcc00",

        "#ff3b30",

        "#00e5ff",

        "#7c4dff",

        "#00e676",

        "#ff4081"

    ];


    // ======================================
    // CREATE ONE FIREWORK BURST
    // ======================================

    function createBurst() {


        const centerX =
            15 + Math.random() * 70;


        const centerY =
            15 + Math.random() * 45;


        const particleCount = 35;


        // ==================================
        // CREATE PARTICLES
        // ==================================

        for (
            let i = 0;
            i < particleCount;
            i++
        ) {


            const particle =
                document.createElement("div");


            // Calculate angle
            const angle =
                (
                    Math.PI * 2 * i
                ) /
                particleCount;


            // Random explosion distance
            const distance =
                60 +
                Math.random() * 100;


            // Random color
            const color =
                colors[
                    Math.floor(
                        Math.random() *
                        colors.length
                    )
                ];


            // ==================================
            // PARTICLE STYLE
            // ==================================

            particle.style.position =
                "absolute";


            particle.style.left =
                centerX + "%";


            particle.style.top =
                centerY + "%";


            particle.style.width =
                "5px";


            particle.style.height =
                "5px";


            particle.style.borderRadius =
                "50%";


            particle.style.background =
                color;


            particle.style.boxShadow =
                "0 0 8px " +
                color +
                ", 0 0 18px " +
                color;


            // Add particle
            fireworks.appendChild(
                particle
            );


            // ==================================
            // CALCULATE MOVEMENT
            // ==================================

            const x =
                Math.cos(angle) *
                distance;


            const y =
                Math.sin(angle) *
                distance;


            // ==================================
            // PARTICLE ANIMATION
            // ==================================

            particle.animate(

                [

                    {
                        transform:
                            "translate(0, 0) scale(0.3)",

                        opacity: 1
                    },


                    {

                        transform:
                            "translate(" +
                            x +
                            "px, " +
                            y +
                            "px) scale(1)",

                        opacity: 0

                    }

                ],


                {

                    duration:
                        1400 +
                        Math.random() * 500,

                    easing:
                        "cubic-bezier(.1,.7,.2,1)",

                    fill:
                        "forwards"

                }

            );

        }

    }


    // ======================================
    // MULTIPLE FIREWORK BURSTS
    // ======================================

    createBurst();


    setTimeout(
        createBurst,
        350
    );


    setTimeout(
        createBurst,
        700
    );


    setTimeout(
        createBurst,
        1100
    );


    // ======================================
    // CLEAN FIREWORKS
    // ======================================

    setTimeout(
        function() {

            fireworks.innerHTML = "";

        },
        3000
    );

}