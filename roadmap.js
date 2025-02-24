document.addEventListener("DOMContentLoaded", function () {
    const roadmapContainer = document.getElementById("roadmapContainer");
    const homeButton = document.getElementById("home-tab2");

    if (!roadmapContainer) {
        console.error("roadmapContainer not found!");
        return;
    }

    if (!homeButton) {
        console.error("home-tab2 button not found!");
        return;
    }

    homeButton.addEventListener("click", function () {
        setSelectedPath('Home');
    });

    window.roadmapData = {
        Backend: {
            "Alused": [
                { name: "HTTP & APIs", description: "Basics of web communication.", video: "https://www.youtube.com/embed/eesqK59rhGA" },
                { name: "REST", description: "Representational State Transfer.", video: "https://www.youtube.com/embed/Q-BpqyOT3a8" },
                { name: "GraphQL", description: "Query language for APIs.", video: "https://www.youtube.com/embed/ed8SzALpx1Q" },
                { name: "Docker", description: "Containerization platform.", video: "https://www.youtube.com/embed/3c-iBn73dDE" },
                { name: "CI/CD", description: "Continuous Integration and Continuous Deployment.", video: "https://www.youtube.com/embed/1JioXM8tEnY" },
                { name: "Microservices", description: "Architectural style that structures an application as a collection of services.", video: "https://www.youtube.com/embed/y8OnoxKotPQ" },
                { name: "Authentication", description: "User authentication and authorization.", video: "https://www.youtube.com/embed/2jqok-WgelI" }
            ],
            "Keeled": [
                { name: "Node.js", description: "JavaScript runtime for backend development.", video: "https://www.youtube.com/embed/TlB_eWDSMt4" },
                { name: "Python", description: "Popular backend language.", video: "https://www.youtube.com/embed/_uQrJ0TkZlc" }
            ],
            "Raamistikud": [
                { name: "Django", description: "High-level Python web framework.", video: "https://www.youtube.com/embed/F5mRW0jo-U4" },
                { name: "Express.js", description: "Fast, unopinionated web framework for Node.js.", video: "https://www.youtube.com/embed/L72fhGm1tfE" },
                { name: "Flask", description: "Lightweight WSGI web application framework.", video: "https://www.youtube.com/embed/Z1RJmh_OqeA" },
                { name: "Spring Boot", description: "Java-based framework.", video: "https://www.youtube.com/embed/vtPkZShrvXQ" },
                { name: "NestJS", description: "Progressive Node.js framework.", video: "https://www.youtube.com/embed/GHTA143_b-s" }
            ],
            "Andmebaasid": [
                { name: "SQL", description: "Structured Query Language.", video: "https://www.youtube.com/embed/HXV3zeQKqGY" },
                { name: "MongoDB", description: "NoSQL database.", video: "https://www.youtube.com/embed/ofme2o29ngU" },
                { name: "PostgreSQL", description: "Powerful, open-source relational database.", video: "https://www.youtube.com/embed/qw--VYLpxG4" },
                { name: "Redis", description: "In-memory data structure store.", video: "https://www.youtube.com/embed/Hbt56gFj998" }
            ]
        },
        Frontend: {
            "Alused": [
                { name: "HTML & CSS", description: "Structure and design of web pages.", video: "https://www.youtube.com/embed/mU6anWqZJcc" },
                { name: "Responsive Design", description: "Optimizing web pages for different devices.", video: "https://www.youtube.com/embed/srvUrASNj0s" },
                { name: "Web Performance", description: "Optimizing load times and user experience.", video: "https://www.youtube.com/embed/R8rmfD9Y5-c" },
                { name: "Accessibility", description: "Designing for people with disabilities.", video: "https://www.youtube.com/embed/3f31oufqFSM" },
                { name: "SEO", description: "Search Engine Optimization.", video: "https://www.youtube.com/embed/DvwS7cV9GmQ" }
            ],
            "Keeled": [
                { name: "JavaScript", description: "Core language of the web.", video: "https://www.youtube.com/embed/W6NZfCO5SIk" },
                { name: "TypeScript", description: "Typed superset of JavaScript.", video: "https://www.youtube.com/embed/BwuLxPH8IDs" }
            ],
            "Raamistikud": [
                { name: "React", description: "Popular frontend library.", video: "https://www.youtube.com/embed/Ke90Tje7VS0" },
                { name: "Vue.js", description: "Progressive JavaScript framework.", video: "https://www.youtube.com/embed/4deVCNJq3qc" },
                { name: "Angular", description: "Platform and framework for building single-page client applications.", video: "https://www.youtube.com/embed/3qBXWUpoPHo" }
            ]
        },
        "Full Stack": {
            "Alused": [
                { name: "Version Control", description: "Using Git and GitHub.", video: "https://www.youtube.com/embed/RGOj5yH7evk" },
                { name: "Command Line", description: "Navigating and interacting with the terminal.", video: "https://www.youtube.com/embed/5XgBd6rjuDQ" },
                { name: "Data Structures & Algorithms", description: "Understanding common data structures and algorithms.", video: "https://www.youtube.com/embed/8hly31xKli0" },
                { name: "Design Patterns", description: "Common solutions to common problems in software design.", video: "https://www.youtube.com/embed/NU_1StN5Tkk" },
                { name: "Testing", description: "Writing tests for your code.", video: "https://www.youtube.com/embed/Eu35xM76kKY" },
                { name: "Agile", description: "Software development methodology.", video: "https://www.youtube.com/embed/Z9QbYZh1YXY" },
                { name: "DevOps", description: "Software development and IT operations.", video: "https://www.youtube.com/embed/0yWAtQ6wYNM" }
            ],
            "Keeled": [
                { name: "JavaScript", description: "Language for both frontend and backend.", video: "https://www.youtube.com/embed/W6NZfCO5SIk" },
                { name: "Python", description: "Popular backend language.", video: "https://www.youtube.com/embed/_uQrJ0TkZlc" },
                { name: "Java", description: "Object-oriented programming language.", video: "https://www.youtube.com/embed/eIrMbAQSU34" }
            ],
            "Raamistikud": [
                { name: "React", description: "Popular frontend library.", video: "https://www.youtube.com/embed/Ke90Tje7VS0" },
                { name: "Express.js", description: "Fast, unopinionated web framework for Node.js.", video: "https://www.youtube.com/embed/L72fhGm1tfE" },
                { name: "Spring Boot", description: "Java-based framework.", video: "https://www.youtube.com/embed/vtPkZShrvXQ" }
            ],
            "Andmebaasid": [
                { name: "PostgreSQL", description: "Powerful, open-source relational database.", video: "https://www.youtube.com/embed/qw--VYLpxG4" },
                { name: "MongoDB", description: "NoSQL database.", video: "https://www.youtube.com/embed/ofme2o29ngU" },
                { name: "Redis", description: "In-memory data structure store.", video: "https://www.youtube.com/embed/Hbt56gFj998" }
            ]
        }
    };
});