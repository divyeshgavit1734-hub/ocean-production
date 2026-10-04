// ==========================================
// OCEAN PRODUCTION
// REGISTRATION FORM
// ==========================================

// Your Supabase Project URL
const SUPABASE_URL = "https://nepianzfbysukaoqqbxf.supabase.co";

// Your Supabase Publishable Key
const SUPABASE_KEY = "sb_publishable_vA6sXJTvJO5QWY6BPyH79g_muuyN9_8";

// Create Supabase connection
const db = window.supabase.createClient(
    SUPABASE_URL,
    SUPABASE_KEY
);


// ==========================================
// FORM ELEMENTS
// ==========================================

const form = document.getElementById("registrationForm");

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

eventDate.min = today;


// ==========================================
// FORM SUBMISSION
// ==========================================

form.addEventListener("submit", async function(event) {

    event.preventDefault();

    formMessage.textContent = "";

    // ------------------------------
    // GET MOBILE NUMBER
    // ------------------------------

    const mobile =
        document.getElementById("mobile")
        .value
        .trim();

    if (!/^[0-9]{10}$/.test(mobile)) {

        formMessage.textContent =
            "Please enter a valid 10-digit mobile number.";

        return;
    }


    // ------------------------------
    // GET SERVICES
    // ------------------------------

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


    // ------------------------------
    // DISABLE BUTTON
    // ------------------------------

    submitButton.disabled = true;

    submitButton.textContent =
        "Submitting...";


    try {

        // ------------------------------
        // CREATE REGISTRATION ID
        // ------------------------------

        const registrationID =
            "OP-" +
            Date.now().toString().slice(-8);


        // ------------------------------
        // GET FORM DATA
        // ------------------------------

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


        // ------------------------------
        // SEND TO SUPABASE
        // ------------------------------

        const { error } =
            await db
                .from("registrations")
                .insert([customer]);


        if (error) {

            console.error(error);

            throw error;
        }


        // ------------------------------
        // SHOW SUCCESS
        // ------------------------------

        document
            .getElementById(
                "registrationNumber"
            )
            .textContent =
            registrationID;


        form.style.display = "none";


        document
            .getElementById("successBox")
            .classList
            .remove("hidden");


        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });


    } catch (error) {

        console.error(error);

        formMessage.textContent =
    "Registration failed: " + (error.message || "Unknown error");

    } finally {

        submitButton.disabled = false;

        submitButton.textContent =
            "Submit Registration";

    }
function launchFireworks() {

    const fireworks = document.getElementById("fireworks");

    if (!fireworks) return;

    fireworks.innerHTML = "";

    for (let i = 0; i < 5; i++) {

        const burst = document.createElement("div");

        burst.style.position = "absolute";
        burst.style.left = (20 + Math.random() * 60) + "%";
        burst.style.top = (15 + Math.random() * 45) + "%";
        burst.style.width = "8px";
        burst.style.height = "8px";
        burst.style.borderRadius = "50%";
        burst.style.background = "#ffcc00";
        burst.style.boxShadow =
            "0 0 20px #ffcc00, 0 0 40px #ff6600";

        fireworks.appendChild(burst);

        burst.animate(
            [
                {
                    transform: "scale(0)",
                    opacity: 1
                },
                {
                    transform: "scale(18)",
                    opacity: 0
                }
            ],
            {
                duration: 1200,
                delay: i * 250,
                easing: "ease-out",
                fill: "forwards"
            }
        );
    }

    setTimeout(function() {
        fireworks.innerHTML = "";
    }, 3000);
}

});