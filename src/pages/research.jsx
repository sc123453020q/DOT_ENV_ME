import React from "react";

const researchPapers = [
  {
    title:
      "Gamification as a Learning Tool for Pro-Environmental Behavior: A Systematic Review (December 2022)",
    author:
      "Huang Miao, Izzal Asnira Zolkepli, Mohamad Saifudin, Mohamad Saleh",
    link: "https://www.researchgate.net/publication/367147565_Gamification_as_a_Learning_Tool_for_Pro-Environmental_Behavior_A_Systematic_Review",
  },
  {
    title:
      "A Review of Empirical Studies on Gamification in K-12 Environmental Education: Is This Chocolate-Covered Brocolli? (2024)",
    author:
      "Zhang, Feiran; Papavlasopoulou, Sofia; Motland, Julie Holte; Giannakos, Michail",
    link: "https://hdl.handle.net/11250/3154841",
  },
  {
    title:
      "Environmental Teaching Supported by Web 2.0-Based Digital Games for a Sustainable Life (November 2024)",
    author: "Kevser Arslan and Neslihan Karakus",
    link: "https://www.mdpi.com/3031474",
  },
  {
    title:
      "Enhancing ESG learning outcomes through gamification: An experimental study",
    author: "Fang Zhang",
    link: "https://pmc.ncbi.nlm.nih.gov/articles/PMC11095718/",
  },
  {
    title:
      "The Use of Gamification and Web-Based Apps for Sustainability Education",
    author:
      "Carolina Novo, Chiara Zanchetta, Elisa Goldmann and Carlos Vaz de Carvalho",
    link: "https://www.mdpi.com/2747480",
  },
  {
    title:
      "Gamifying Environmental Education: A Primary School Perspective Through a Serious Game",
    author: "E. Kirschhof, A. Becker, G. Descovi, A. Machado, and V. Maran",
    link: "https://www.scitepress.org/Papers/2024/126170/126170.pdf",
  },
  {
    title:
      "GAMIFIED LEARNING PATHS: INTEGRATING CAMPUS WALKS INTO SUSTAINABILITY EDUCATION",
    author: "Anne-Marie Tuomala and Alexandra Maksheeva",
    link: "https://oaji.net/articles/2023/3066-1732552649.pdf",
  },
  {
    title:
      "Preventing pollution: A scoping review of immersive learning environments and gamified systems for children and young people",
    author: "David Hayes, Jennifer E. Symonds &Todd A. Harwell",
    link: "https://www.tandfonline.com/doi/full/10.1080/15391523.2022.2107589",
  },
  {
    title:
      "ICT MEDIATED GAMIFICATION IN EDUCATION DEGREES: A COMMITMENT TO SUSTAINABILITY",
    author: "Maria del Carmen Pegalajar-Palomino* , Estefanía Martínez-Valdivia",
    link: "https://www.jotse.org/index.php/jotse/article/view/2624/877",
  },
  {
    title:
      "Gamification Approaches for Education and Engagement on Pro-Environmental Behaviors: Searching for Best Practices",
    author: "Tania Ouariachi *ORCID,Chih-Yen Li andWim J. L. Elving",
    link: "https://www.mdpi.com/2071-1050/12/11/4565",
  },
];

export default function Research() {
  return (
    <div className="min-h-screen bg-green-50 py-20 px-6">
      <h1 className="text-4xl font-extrabold text-center text-green-900 mb-4">
        Environmental Research
      </h1>
      <p className="text-lg text-center text-green-700 mb-12">
        Explore impactful research papers by environmental scientists and
        researchers.
      </p>

      <div className="max-w-6xl mx-auto grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {researchPapers.map((paper, index) => (
          <div
            key={index}
            className="bg-white border-2 border-green-200 rounded-xl shadow-md hover:shadow-xl transition-transform transform hover:-translate-y-1 p-6 text-left"
          >
            <h2 className="text-lg font-semibold text-green-800 mb-3">
              {paper.title}
            </h2>
            <p className="text-sm text-green-600 italic mb-4">
              By {paper.author}
            </p>
            <a
              href={paper.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-4 py-2 bg-green-700 text-white text-sm font-medium rounded-md hover:bg-green-800 transition-colors"
            >
              Read Paper
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
