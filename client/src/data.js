export const personalInfo = {
  name: "Peejay David",
  role: "aspiring cloud engineer",
  contact: {
    email: "davidpeejay123@gmail.com",
    linkedin: "https://www.linkedin.com/in/peejay-david",
    github: "https://github.com/countervant"
  }
};

export const skills = {
  awsServices: [
    "EC2",
    "S3",
    "IAM",
    "VPC",
    "CloudWatch",
    "Route 53",
    "Lambda",
    "Amazon Bedrock",
    "Amazon SageMaker"
  ],
  cloudAndDevOps: [
    "Linux",
    "Networking",
    "Git",
    "Docker",
    "Terraform",
    "CI/CD",
    "Bash"
  ],
  development: [
    "JavaScript",
    "React",
    "Node.js",
    "Express.js"
  ],
  graphicDesign: [
    "Photoshop",
    "Figma",
    "Canva"
  ]
};

export const certifications = [
  {
    id: 1,
    name: "AWS Certified AI Practitioner",
    status: "achieved",
    date: "September 5, 2026",
    badge: "/images/Ai practitioner.png",
    issuer: "Amazon Web Services",
    link: "https://www.credly.com/badges/8a54d7ab-3f8f-4211-a158-5604703dc2d3"
  },
  {
    id: 2,
    name: "AWS Certified Cloud Practitioner",
    status: "achieved",
    date: "September 23, 2026",
    badge: "/images/cloud practitioner.png",
    issuer: "Amazon Web Services",
    link: "https://www.credly.com/badges/52f54648-0932-453a-8af8-aa4938acfffb"
  },
  {
    id: 3,
    name: "AWS Certified Solutions Architect – Associate",
    status: "future goal",
    issuer: "Amazon Web Services"
  }
];

export const projects = [
  {
    id: 1,
    title: "AWS Cloud Portfolio Deployment",
    subtitle: "Static Site Hosting & Serverless Backend",
    techStack: "Amazon S3, Amazon CloudFront, AWS Lambda, AWS Certificate Manager (ACM), Resend API, Name.com DNS, GitHub Actions (CI/CD)",
    image: "/images/project-aws-960.v1.webp",
    imageSrcSet: "/images/project-aws-480.v1.webp 480w, /images/project-aws-960.v1.webp 960w",
    category: "Cloud"
  },
  {
    id: 2,
    title: "Virtual VPN | Cloud VPN Gateway",
    subtitle: "Production WireGuard VPN appliance and real-time React dashboard hosted on AWS EC2. Features kernel-level Fail2ban brute-force defense, CloudWatch hardware auto-recovery, daily rolling EBS snapshots",
    techStack: "AWS EC2, EBS, CloudWatch, WireGuard, Nginx, Fail2ban",
    image: "/images/Project 2.png",
    link: "https://peejay-vpn.duckdns.org",
    category: "Cloud"
  },
  {
    id: 3,
    title: "Brand Identity Design",
    subtitle: "logo and brand guidelines",
    techStack: "Illustrator, Photoshop",
    image: null,
    category: "Graphic Design"
  },
  {
    id: 4,
    title: "Social Media Campaign",
    subtitle: "marketing visual assets",
    techStack: "Figma, Photoshop",
    image: null,
    category: "Graphic Design"
  },
  {
    id: 5,
    title: "UI/UX Mockups",
    subtitle: "web app interface design",
    techStack: "Figma",
    image: null,
    category: "Graphic Design"
  },
  {
    id: 6,
    title: "Print Brochure",
    subtitle: "event promotional material",
    techStack: "InDesign, Illustrator",
    image: null,
    category: "Graphic Design"
  },
  {
    id: 7,
    title: "Poster Design",
    subtitle: "typographic poster series",
    techStack: "Photoshop, Illustrator",
    image: null,
    category: "Graphic Design"
  },
  {
    id: 8,
    title: "Packaging Design",
    subtitle: "product box concepts",
    techStack: "Illustrator, Dimension",
    image: null,
    category: "Graphic Design"
  }
];
