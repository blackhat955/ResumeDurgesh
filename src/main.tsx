import React from "react";
import { createRoot } from "react-dom/client";
import {
  ArrowUpRight,
  BarChart3,
  Brain,
  Database,
  Github,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  ServerCog,
  Sparkles,
  TestTube2,
} from "lucide-react";
import { ThreeHero } from "./ThreeHero";
import "./styles.css";

type Experience = {
  role: string;
  company: string;
  location: string;
  period: string;
  points: string[];
};

const skills = [
  {
    label: "Languages",
    value: "Python, R, SQL, Scala, Java",
  },
  {
    label: "Data Platforms",
    value: "Spark, Databricks, Snowflake, BigQuery, Airflow, DBT",
  },
  {
    label: "Machine Learning",
    value:
      "Supervised and unsupervised learning, deep learning, NLP, feature engineering, model evaluation, scikit-learn, TensorFlow, PyTorch",
  },
  {
    label: "Analytics",
    value:
      "EDA, time-series forecasting, ARIMA, Prophet, A/B testing, experimentation, statistical analysis",
  },
  {
    label: "Cloud and Tools",
    value: "AWS S3, EC2, Glue, Azure Data Factory, Synapse, GCP, Docker, Git",
  },
  {
    label: "Visual and Reporting",
    value: "Tableau, Power BI, Looker, R Shiny, Jupyter Notebook",
  },
];

const experiences: Experience[] = [
  {
    role: "Data Scientist",
    company: "Kahana Technologies",
    location: "Chicago, IL",
    period: "Jun 2025 - Present",
    points: [
      "Partnered with marketing and product leadership to define revenue-critical KPIs and build executive dashboards in Tableau and Power BI, contributing to $10K+ in attributable revenue impact.",
      "Designed and analyzed A/B tests for onboarding flows and feature rollouts, quantifying uplift in activation and revenue metrics and driving double-digit conversion improvements.",
      "Developed churn and lifetime value models with Python, scikit-learn, and PyTorch to identify at-risk users and guide retention strategies.",
      "Delivered analytics-ready datasets and automated Snowflake and Databricks pipelines with DBT transformations, maintaining 98% uptime and sub-24-hour data freshness.",
      "Reduced compute costs by up to 30% through partitioning, clustering, and query optimization.",
    ],
  },
  {
    role: "Head Associate Instructor",
    company: "Indiana University Bloomington",
    location: "Bloomington, IN",
    period: "Aug 2024 - May 2025",
    points: [
      "Led and coordinated 6+ student teams on time-series and analytics projects using Agile workflows and Jira.",
      "Mentored 50+ students in time-series analysis and applied analytics with Python and R, supporting ARIMA, Prophet, feature engineering, and model validation through code reviews.",
    ],
  },
  {
    role: "Data Science Research Assistant",
    company: "Indiana University Bloomington",
    location: "Bloomington, IN",
    period: "Dec 2024 - May 2025",
    points: [
      "Conducted statistical analysis and predictive modeling on 5TB+ of health and insurance datasets in shared HPC environments.",
      "Engineered batch-processing workflows with job parallelization and optimized data formats, reducing end-to-end processing time by 40%.",
      "Improved transformation performance by 35% using memory-efficient R libraries including data.table.",
    ],
  },
  {
    role: "Data Scientist",
    company: "Programmers Army",
    location: "Mumbai, India",
    period: "May 2022 - Aug 2023",
    points: [
      "Built Spark and Airflow pipelines processing 10GB+ per batch, creating high-quality feature sets for analytics and modeling.",
      "Designed A/B testing frameworks for product and UI experiments, driving 15%+ improvements in key engagement metrics.",
      "Improved query performance by 30% through partitioning and columnar storage layouts.",
      "Migrated ingestion workflows to distributed Spark processing, accelerating ETL performance by 70%.",
    ],
  },
];

const metrics = [
  { label: "Revenue Impact", value: "$10K+" },
  { label: "Data Scale", value: "5TB+" },
  { label: "ETL Speedup", value: "70%" },
  { label: "Cost Reduction", value: "30%" },
];

function App() {
  return (
    <main>
      <section className="hero" aria-labelledby="hero-title">
        <ThreeHero />
        <div className="hero__overlay" />
        <nav className="topbar" aria-label="Primary navigation">
          <a className="brand" href="#top" aria-label="Durgesh Tiwari home">
            DT
          </a>
          <div className="topbar__links">
            <a href="#experience">Experience</a>
            <a href="#skills">Skills</a>
            <a href="#projects">Projects</a>
          </div>
        </nav>

        <div id="top" className="hero__content">
          <div className="availability">
            <Sparkles size={16} aria-hidden="true" />
            <span>Data Scientist specializing in ML, analytics, and experimentation</span>
          </div>
          <h1 id="hero-title">Durgesh Tiwari</h1>
          <p className="hero__copy">
            I build revenue-focused data products, predictive models, and
            analytics pipelines that turn complex datasets into decisions.
          </p>
          <div className="hero__actions" aria-label="Contact links">
            <a className="button button--primary" href="mailto:durgeshse98@gmail.com">
              <Mail size={18} aria-hidden="true" />
              Email
            </a>
            <a
              className="button"
              href="https://www.linkedin.com/in/durgesh98"
              target="_blank"
              rel="noreferrer"
            >
              <Linkedin size={18} aria-hidden="true" />
              LinkedIn
            </a>
            <a
              className="button button--icon"
              href="https://github.com/blackhat955"
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub profile"
              title="GitHub profile"
            >
              <Github size={19} aria-hidden="true" />
            </a>
          </div>
        </div>

        <aside className="contact-panel" aria-label="Contact details">
          <a href="tel:+18127785427">
            <Phone size={15} aria-hidden="true" />
            +1 (812) 778-5427
          </a>
          <a href="mailto:durgeshse98@gmail.com">
            <Mail size={15} aria-hidden="true" />
            durgeshse98@gmail.com
          </a>
          <span>
            <MapPin size={15} aria-hidden="true" />
            Bloomington, IN
          </span>
        </aside>
      </section>

      <section className="metrics" aria-label="Career metrics">
        {metrics.map((metric) => (
          <div className="metric" key={metric.label}>
            <strong>{metric.value}</strong>
            <span>{metric.label}</span>
          </div>
        ))}
      </section>

      <section className="section intro-grid" aria-label="Profile summary">
        <div>
          <p className="eyebrow">Profile</p>
          <h2>Data science for product growth and operational scale.</h2>
        </div>
        <p>
          MS Data Science graduate from Indiana University Bloomington with
          hands-on experience across experimentation, churn and LTV modeling,
          time-series analysis, distributed data pipelines, and executive
          reporting.
        </p>
      </section>

      <section id="experience" className="section">
        <div className="section__heading">
          <p className="eyebrow">Experience</p>
          <h2>Recent Work</h2>
        </div>
        <div className="timeline">
          {experiences.map((item) => (
            <article className="timeline__item" key={`${item.company}-${item.role}`}>
              <div className="timeline__meta">
                <span>{item.period}</span>
              </div>
              <div className="timeline__body">
                <div className="role-line">
                  <h3>{item.role}</h3>
                  <span>{item.company}</span>
                </div>
                <p className="location">{item.location}</p>
                <ul>
                  {item.points.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section id="skills" className="section skills-section">
        <div className="section__heading">
          <p className="eyebrow">Skills</p>
          <h2>Technical Stack</h2>
        </div>
        <div className="skill-grid">
          {skills.map((skill) => (
            <article className="skill-card" key={skill.label}>
              <h3>{skill.label}</h3>
              <p>{skill.value}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="projects" className="section project-section">
        <div className="project">
          <div className="project__visual" aria-hidden="true">
            <Brain />
            <Database />
            <BarChart3 />
            <ServerCog />
            <TestTube2 />
          </div>
          <div>
            <p className="eyebrow">Project</p>
            <h2>Intelligent Job Matching and Ranking Platform</h2>
            <p className="project__period">Jan 2025 - May 2025</p>
            <ul>
              <li>
                Built a gamified job-matching platform using NLP-based feature
                extraction and user-based collaborative filtering.
              </li>
              <li>
                Developed candidate-company ranking models with matrix
                factorization, achieving 0.3 RMSE on offline evaluation data.
              </li>
              <li>
                Integrated REST APIs and scraping pipelines for near real-time
                candidate-job mapping.
              </li>
            </ul>
          </div>
        </div>
      </section>

      <section className="section education-section">
        <div className="section__heading">
          <p className="eyebrow">Education</p>
          <h2>Academic Background</h2>
        </div>
        <div className="education-grid">
          <article>
            <span>Aug 2023 - May 2025</span>
            <h3>Indiana University Bloomington</h3>
            <p>Master of Science in Data Science, GPA 3.6 / 4.0</p>
            <small>
              Applied Algorithms, Big Data Management, Applied Machine Learning,
              Computer Vision
            </small>
          </article>
          <article>
            <span>Aug 2018 - May 2022</span>
            <h3>University of Mumbai</h3>
            <p>Bachelor of Engineering in Information Technology, GPA 3.74 / 4.0</p>
            <small>
              Object-Oriented Programming, Computer Networks, Operating Systems,
              Statistics
            </small>
          </article>
        </div>
      </section>

      <footer className="footer">
        <span>Durgesh Tiwari</span>
        <a href="mailto:durgeshse98@gmail.com">
          Start a conversation
          <ArrowUpRight size={16} aria-hidden="true" />
        </a>
      </footer>
    </main>
  );
}

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
