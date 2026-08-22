import project1Img from './assets/project1.png';
import project2Img from './assets/project2.png';

export const personalInfo = {
  name: "Peejay David",
  role: "aspiring cloud engineer",
  subtitle: "focused on AWS cloud, cloud infrastructure, and building modern cloud-based solutions.",
  shortIntro: "I’m an aspiring cloud engineer focused on AWS cloud technologies, hands-on projects, and building a strong foundation in infrastructure, networking, automation, and DevOps.",
  aboutMe: "I’m an aspiring cloud engineer interested in AWS, cloud infrastructure, automation, and scalable systems. I enjoy learning through hands-on labs and personal projects, and I’m building my skills in cloud technologies, Linux, networking, and DevOps tools.",
  contact: {
    email: "davidpeejay@gmail.com",
    linkedin: "linkedin",
    github: "github"
  },
  resumeUrl: "#"
};

export const skills = {
  awsServices: [
    "EC2",
    "S3",
    "IAM",
    "VPC",
    "CloudWatch",
    "Route 53",
    "Lambda"
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
    name: "AWS Certified Cloud Practitioner",
    status: "in progress"
  },
  {
    id: 2,
    name: "AWS Certified Solutions Architect – Associate",
    status: "future goal"
  }
];

export const projects = [
  {
    id: 1,
    title: "AWS Static Portfolio Deployment",
    subtitle: "static site deployment",
    techStack: "Amazon S3, Amazon CloudFront, AWS Certificate Manager (ACM), Name.com DNS, GitHub Actions (CI/CD)",
    image: project1Img,
    link: "#",
    category: "Cloud"
  },
  {
    id: 2,
    title: "AWS Cloud Cost Intelligence & FinOps Guardrail Dashboard",
    subtitle: "Real-time AWS spend observability, interactive what-if workload forecasting, and automated email guardrails to eliminate cloud bill shock.",
    techStack: "AWS SDK v3, AWS Cost Explorer, CloudWatch, Amazon SNS",
    image: project2Img,
    link: "#",
    category: "Cloud"
  },
  {
    id: 3,
    title: "Serverless Application",
    subtitle: "lambda-based workflow",
    techStack: "Lambda, API Gateway",
    image: null,
    link: "#",
    category: "Cloud"
  },
  {
    id: 4,
    title: "Brand Identity Design",
    subtitle: "logo and brand guidelines",
    techStack: "Illustrator, Photoshop",
    image: null,
    link: "#",
    category: "Graphic Design"
  },
  {
    id: 5,
    title: "Social Media Campaign",
    subtitle: "marketing visual assets",
    techStack: "Figma, Photoshop",
    image: null,
    link: "#",
    category: "Graphic Design"
  },
  {
    id: 6,
    title: "UI/UX Mockups",
    subtitle: "web app interface design",
    techStack: "Figma",
    image: null,
    link: "#",
    category: "Graphic Design"
  },
  {
    id: 7,
    title: "Print Brochure",
    subtitle: "event promotional material",
    techStack: "InDesign, Illustrator",
    image: null,
    link: "#",
    category: "Graphic Design"
  },
  {
    id: 8,
    title: "Poster Design",
    subtitle: "typographic poster series",
    techStack: "Photoshop, Illustrator",
    image: null,
    link: "#",
    category: "Graphic Design"
  },
  {
    id: 9,
    title: "Packaging Design",
    subtitle: "product box concepts",
    techStack: "Illustrator, Dimension",
    image: null,
    link: "#",
    category: "Graphic Design"
  }
];

export const focusData = [
  "AWS Cloud",
  "Cloud Infrastructure",
  "Cloud Security",
  "Automation",
  "DevOps",
  "Infrastructure as Code"
];
