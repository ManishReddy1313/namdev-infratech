const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.DATABASE_URL?.includes('localhost') ? false : { rejectUnauthorized: false }
});

const projects = [
  {
    title: "Basapura Villa Railing",
    slug: "basapura-villa-railing",
    description: `When the owners of a beautiful villa in Basapura envisioned a railing that would complement the elegance of their home, they turned to Namdev Infratech. What followed was a collaboration rooted in trust, craftsmanship, and an unwavering commitment to detail.

Our team re-designed and custom-fabricated a striking metal railing that seamlessly blends safety with aesthetic sophistication. Every curve, every joint, and every finish was meticulously crafted to enhance the villa's architectural character — not just protect it.

From initial concept sketches to on-site installation, we worked closely with the homeowners to ensure the railing reflected their personal style while meeting the highest structural standards. The result is a railing that doesn't just serve a purpose — it tells a story of precision engineering and heartfelt craftsmanship.

At Namdev Infratech, we believe that even the smallest detail in a home deserves the same dedication as the grandest structure. This project is a testament to that philosophy.`,
    category: "creative",
    gallery: [],
    materials: ["Mild Steel", "Powder Coating", "Custom Metal Finish"],
    client_type: "Residential Villa Owner",
    featured: false,
    seo_title: "Custom Metal Railing for Basapura Villa | Namdev Infratech",
    seo_description: "Beautifully re-designed and fabricated metal railing for a residential villa in Basapura. Custom metalwork by Namdev Infratech — precision engineering meets elegant design."
  },
  {
    title: "Boutique Display Stand",
    slug: "boutique-display-stand",
    description: `In the world of fashion retail, first impressions are everything. When a premium fashion boutique needed a display stand that matched the luxury of their brand, they chose Namdev Infratech to bring their vision to life.

We fabricated a bespoke metal showroom display stand finished with an exquisite gold powder coating — a piece that transforms any collection into a visual masterpiece. The stand was designed not just to hold garments, but to elevate them, creating an immersive shopping experience that draws customers in.

Every element was carefully considered: the proportions, the finish, the structural integrity to hold delicate fabrics without compromise. The gold powder-coated finish adds a touch of opulence that perfectly mirrors the boutique's brand identity.

This project showcases our versatility at Namdev Infratech — from heavy industrial structures to refined retail solutions, we bring the same passion, precision, and professionalism to every project we undertake.`,
    category: "creative",
    gallery: [],
    materials: ["Mild Steel", "Gold Powder Coating", "Custom Metalwork"],
    client_type: "Fashion Boutique",
    featured: false,
    seo_title: "Gold Powder Coated Boutique Display Stand | Namdev Infratech",
    seo_description: "Custom-fabricated gold powder coated metal display stand for a fashion boutique. Premium retail fixtures crafted by Namdev Infratech with precision metalwork."
  },
  {
    title: "CNC Pergola in Indiranagar",
    slug: "cnc-pergola-indiranagar",
    description: `Nestled in the vibrant heart of Indiranagar, Bangalore, this CNC-cut pergola stands as a perfect marriage of technology and artistry. When our client wanted something truly unique for their outdoor space, we knew that ordinary wouldn't do.

Our design team re-imagined a CNC pattern specifically for this project — a pattern that plays beautifully with light and shadow throughout the day, creating ever-changing visual poetry on the walls and floors below. The intricate design was laser-cut with surgical precision, ensuring every detail was flawless.

The pergola was pre-fabricated in our workshop to guarantee quality control at every stage, then carefully transported and installed on-site. The result is a stunning architectural feature that transforms an ordinary terrace into an extraordinary outdoor living space.

This project embodies what we do best at Namdev Infratech: combining cutting-edge CNC technology with traditional fabrication expertise to create structures that are both functional and breathtakingly beautiful. It's not just shade — it's a statement.`,
    category: "creative",
    gallery: ["/uploads/projects/cnc-pergola-indiranagar-1.jpg", "/uploads/projects/cnc-pergola-indiranagar-2.jpg", "/uploads/projects/cnc-pergola-indiranagar-3.jpg", "/uploads/projects/cnc-pergola-indiranagar-4.jpg"],
    materials: ["Mild Steel", "CNC Laser Cut Panels", "Powder Coating", "Pre-fabricated Components"],
    client_type: "Residential Client",
    featured: true,
    seo_title: "CNC Laser Cut Pergola in Indiranagar Bangalore | Namdev Infratech",
    seo_description: "Custom CNC laser-cut metal pergola designed and installed in Indiranagar, Bangalore. Pre-fabricated with intricate patterns by Namdev Infratech for stunning outdoor spaces."
  },
  {
    title: "Computer Table",
    slug: "computer-table",
    description: `Great workspaces inspire great work. That's the philosophy behind this custom computer table — a piece where industrial strength meets warm, natural beauty.

We designed and fabricated a robust metal frame computer table topped with premium finger-joint pine wood, creating a workspace that's as sturdy as it is stylish. The metal frame provides unshakeable stability for long work sessions, while the natural pine wood top brings warmth and character that no mass-produced desk can match.

Every weld was ground smooth, every joint was measured twice and cut once, and the pine wood top was finished to highlight its natural grain patterns. The result is a desk that feels as good as it looks — one that transforms any room into a productive, inspiring workspace.

At Namdev Infratech, we understand that furniture is personal. That's why we craft each piece to order, ensuring it fits not just the space, but the person who'll use it every day.`,
    category: "creative",
    gallery: [],
    materials: ["Mild Steel Frame", "Finger Joint Pine Wood", "Industrial Hardware"],
    client_type: "Individual Client",
    featured: false,
    seo_title: "Custom Metal Frame Computer Table with Pine Wood Top | Namdev Infratech",
    seo_description: "Handcrafted metal frame computer table with finger-joint pine wood top. Industrial-style custom furniture by Namdev Infratech — built for durability and design."
  },
  {
    title: "Concept Proposal — Custom Pergola Design",
    slug: "concept-proposal-pergola",
    description: `Every great structure begins with a great idea. When a client approached us with a dream of transforming their outdoor space, we didn't just listen — we visualized it for them.

Our design team created a detailed 3D concept proposal for a custom pergola, bringing the client's vision to life before a single piece of metal was cut. The 3D renders allowed them to walk through the design virtually, adjusting proportions, materials, and finishes until every detail was perfect.

This proposal showcased multiple design options — from minimalist modern lines to intricate pattern work — giving the client the confidence to make an informed decision. Our 3D visualization process eliminates guesswork and ensures that what you see is exactly what you get.

At Namdev Infratech, we believe that the design phase is just as important as the fabrication. That's why we invest in cutting-edge 3D design tools and a talented design team — because your dream deserves to be seen before it's built.`,
    category: "creative",
    gallery: [],
    materials: ["3D Design & Visualization", "Concept Development"],
    client_type: "Residential Client",
    featured: false,
    seo_title: "3D Pergola Design Concept Proposal | Namdev Infratech",
    seo_description: "Professional 3D pergola design concept proposal by Namdev Infratech. Custom outdoor structure visualization and design services in Bangalore."
  },
  {
    title: "Dining Table with Quartz Top",
    slug: "dining-table-quartz-top",
    description: `The dining table is where families come together, stories are shared, and memories are made. When a leading interior design company needed a dining table that would be the centrepiece of their client's home, they trusted Namdev Infratech to deliver something extraordinary.

We designed and fabricated a stunning quartz-top dining table supported by a custom metal frame that combines structural elegance with raw industrial character. The quartz top brings timeless sophistication and effortless maintenance, while our precision-welded metal base provides rock-solid stability with a design that catches the eye.

Every angle was calculated for both aesthetics and ergonomics. The metal frame was finished to complement the quartz's natural veining, creating a harmonious piece that feels both luxurious and grounded. It's a table built to last generations — not just years.

This collaboration with interior designers is something we cherish at Namdev Infratech. It's where engineering meets artistry, and the results speak for themselves.`,
    category: "creative",
    gallery: [],
    materials: ["Quartz Top", "Custom Metal Frame", "Precision Welding", "Premium Finish"],
    client_type: "Interior Design Company",
    featured: false,
    seo_title: "Custom Quartz Top Dining Table with Metal Frame | Namdev Infratech",
    seo_description: "Bespoke quartz-top dining table with custom metal frame designed for an interior design firm. Premium metal furniture crafted by Namdev Infratech."
  },
  {
    title: "Dr. Rashmi's Villa Main Gate",
    slug: "dr-rashmi-villa-main-gate",
    description: `A home's main gate is its first handshake with the world — it sets the tone for everything that lies beyond. When Dr. Rashmi's villa needed a new main gate as part of a renovation project, the challenge was clear: create something that combines security with striking visual appeal.

We fabricated a robust metal pipe frame main gate and finished it with a unique deco-painted wood grain effect — a finish so realistic that visitors often mistake it for solid wood. The entire gate was fabricated off-site for precision, then installed and painted on-site to ensure a perfect fit and seamless finish.

The wood grain deco painting technique is one of our specialities — it gives the warmth and elegance of wood with the strength and durability of steel. No rotting, no warping, no termites — just lasting beauty and fortress-like security.

This renovation project was a labour of love, and the gate now stands as a proud introduction to a beautiful home. At Namdev Infratech, we don't just build gates — we craft first impressions.`,
    category: "creative",
    gallery: [],
    materials: ["MS Pipe Frame", "Deco Paint Wood Grain Finish", "On-site Installation"],
    client_type: "Residential Renovation",
    featured: false,
    seo_title: "Custom Metal Main Gate with Wood Grain Finish | Namdev Infratech",
    seo_description: "Custom-fabricated metal pipe main gate with realistic wood grain deco paint finish for Dr. Rashmi's villa renovation. Premium gate fabrication by Namdev Infratech."
  },
  {
    title: "Hebbal Pergola — Glass Roof Turnkey Project",
    slug: "hebbal-pergola-glass-roof",
    description: `High above the city, on a terrace in Hebbal, Bangalore, sits a pergola that redefines outdoor living. This was more than a fabrication project — it was a complete turnkey solution executed for a prestigious landscaping company.

We designed, fabricated, and installed a stunning glass roof pergola that transforms a bare terrace into a sophisticated outdoor lounge. The glass roof allows natural light to pour in while providing complete weather protection, creating a space that can be enjoyed year-round, rain or shine.

The metal framework was engineered to support the weight of tempered glass panels while maintaining clean, elegant lines. Every structural calculation was verified, every joint was precision-welded, and every glass panel was sealed to perfection.

Working with the landscaping company, we coordinated every aspect — from structural engineering to final installation — ensuring a seamless handover. The terrace pergola has since become the highlight of the property, a space where conversations flow as freely as the natural light above.

This project represents Namdev Infratech at our best: engineering excellence, aesthetic sensitivity, and end-to-end project management that our partners can rely on.`,
    category: "creative",
    gallery: [],
    materials: ["Structural Steel Frame", "Tempered Glass Roof Panels", "Powder Coating", "Weather Sealing"],
    client_type: "Landscaping Company",
    featured: true,
    seo_title: "Glass Roof Pergola Terrace Installation Hebbal Bangalore | Namdev Infratech",
    seo_description: "Turnkey glass roof pergola for terrace in Hebbal, Bangalore. End-to-end design, fabrication, and installation by Namdev Infratech for landscaping company."
  },
  {
    title: "Karan's DJ Setup Table",
    slug: "karans-dj-setup-table",
    description: `When Karan, a professional DJ, needed furniture that could keep up with the energy of his performances, standard off-the-shelf options simply wouldn't cut it. He needed something modular, rock-solid, and built to handle the vibrations, weight, and demands of professional DJ equipment.

Enter Namdev Infratech. We designed and fabricated a modular metal furniture system specifically engineered for DJ setups. The structure provides exceptional rigidity to prevent vibrations from affecting turntables and mixers, while the modular design allows Karan to reconfigure his setup for different venues and events.

Every component was stress-tested and optimised for both portability and strength. The clean industrial aesthetic perfectly complements the modern DJ culture — functional art that performs as hard as the artist behind it.

This project is a perfect example of why custom fabrication matters. When your passion depends on your equipment, you need furniture that's built to perform — not just to sit there. Karan's table is built to move the crowd.`,
    category: "creative",
    gallery: [],
    materials: ["Heavy Gauge Mild Steel", "Modular Joint System", "Anti-vibration Design", "Powder Coating"],
    client_type: "Professional DJ",
    featured: false,
    seo_title: "Custom Modular DJ Setup Table — Metal Furniture | Namdev Infratech",
    seo_description: "Custom-built modular metal DJ table with enhanced structural strength for professional use. Bespoke metal furniture by Namdev Infratech."
  },
  {
    title: "Cloud Kitchen Partition Wall",
    slug: "cloud-kitchen-partition-wall",
    description: `In the fast-paced world of cloud kitchens, efficient space utilisation is everything. When a cloud kitchen operator needed to divide their operational space without compromising airflow or visibility, they called Namdev Infratech.

We designed and installed a sleek metal pipe partition wall that creates distinct zones within the kitchen while maintaining the open, airy feel essential for kitchen operations. The partition allows natural ventilation and line-of-sight management — critical for both hygiene compliance and operational efficiency.

The metal pipe design was chosen for its durability in high-humidity kitchen environments, ease of cleaning, and resistance to the grease and heat that are part of everyday kitchen life. It's industrial design with a practical purpose — form following function in the truest sense.

This project demonstrates our ability to deliver practical, durable solutions for commercial environments. At Namdev Infratech, we understand that in the food industry, every square foot matters — and our fabrication ensures none of it goes to waste.`,
    category: "creative",
    gallery: [],
    materials: ["MS Pipes", "Floor & Ceiling Mounting", "Industrial Finish"],
    client_type: "Cloud Kitchen Operator",
    featured: false,
    seo_title: "Metal Pipe Partition Wall for Cloud Kitchen | Namdev Infratech",
    seo_description: "Custom metal pipe partition wall installed for a cloud kitchen. Durable, hygienic commercial kitchen fabrication by Namdev Infratech."
  },
  {
    title: "Custom Metal Stands & Frames",
    slug: "custom-metal-stands-frames",
    description: `Behind every beautifully designed interior, there's a framework of precision-engineered metal holding it all together. When an interior design company needed a range of custom metal frames and stands for their projects, Namdev Infratech delivered — not just one piece, but an entire collection.

We fabricated multiple metal frames tailored to specific design requirements: from sleek display frames to structural support stands, each piece was built to the exact specifications provided by the design team. Our attention to dimensional accuracy ensures that every frame integrates perfectly with the surrounding design elements.

Working with interior designers requires a special kind of precision — tolerances measured in millimetres, finishes that complement carefully curated palettes, and delivery timelines that align with complex project schedules. We delivered on all fronts.

This ongoing collaboration is one we're proud of. It represents the trust that design professionals place in Namdev Infratech — knowing that when they need custom metalwork, we'll deliver quality that elevates their designs.`,
    category: "creative",
    gallery: [],
    materials: ["Mild Steel", "Custom Fabrication", "Precision Welding", "Various Finishes"],
    client_type: "Interior Design Company",
    featured: false,
    seo_title: "Custom Metal Frames & Stands for Interior Design | Namdev Infratech",
    seo_description: "Precision-fabricated custom metal frames and stands for interior design projects. Professional metalwork solutions by Namdev Infratech."
  },
  {
    title: "Metal Fabrication Across Bangalore",
    slug: "metal-fabrication-across-bangalore",
    description: `Across the bustling streets of Bangalore — from tech parks in Whitefield to heritage homes in Jayanagar — Namdev Infratech's craftsmanship can be found in countless forms. This collection represents the diverse range of metal fabrication work we've completed across the city.

From custom railings and structural supports to decorative metalwork and functional installations, each project in this collection tells a unique story. Some were urgent repairs completed overnight; others were meticulous custom creations developed over weeks. But every single one carries the same Namdev Infratech hallmark: uncompromising quality.

What makes this collection special is its diversity. It showcases our ability to adapt — to move seamlessly from a delicate residential handrail to a heavy-duty commercial installation, from artistic decorative work to purely functional structural solutions.

Bangalore is a city that builds constantly, evolves rapidly, and demands excellence at every turn. At Namdev Infratech, we're proud to be part of that story — one fabrication at a time.`,
    category: "creative",
    gallery: ["/uploads/projects/fabricated-structures-1.jpg", "/uploads/projects/fabricated-structures-2.jpg", "/uploads/projects/fabricated-structures-3.jpg", "/uploads/projects/fabricated-structures-4.jpg"],
    materials: ["Mild Steel", "Structural Steel", "Various Coatings", "Mixed Materials"],
    client_type: "Various Clients",
    featured: false,
    seo_title: "Metal Fabrication Work Across Bangalore | Namdev Infratech",
    seo_description: "Diverse metal fabrication projects across Bangalore — railings, structures, decorative metalwork, and more. Quality craftsmanship by Namdev Infratech."
  },
  {
    title: "Namdev Industrial Warehouse",
    slug: "namdev-industrial-warehouse",
    description: `When you need a structure that can withstand the test of time, weather, and heavy industrial use, you need more than a builder — you need an engineering partner. The Namdev Industrial Warehouse project was exactly that kind of challenge, and we rose to meet it with everything we had.

We designed and executed a complete metal industrial structure from the ground up — a true end-to-end solution. From structural engineering and foundation design to fabrication, erection, and finishing, every phase was managed by our team. No subcontractors, no handoffs, no compromises.

The warehouse was engineered for maximum usable space with clear-span construction, eliminating interior columns that would restrict movement and storage. The roofing system was designed for thermal efficiency and weather resistance, while the structural frame was calculated to handle both dead loads and wind loads specific to the region.

This project represents the industrial backbone of Namdev Infratech. It's where our roots in structural steel shine brightest — in large-scale projects that demand engineering precision, fabrication excellence, and project management discipline. This warehouse isn't just a building; it's a promise of strength that stands tall.`,
    category: "industrial",
    gallery: [],
    materials: ["Structural Steel", "MS Beams", "MS Columns", "Metal Roofing Sheets", "Foundation Work"],
    client_type: "Industrial Client",
    featured: true,
    seo_title: "Industrial Warehouse Construction & Steel Structure | Namdev Infratech",
    seo_description: "End-to-end industrial warehouse design and construction with structural steel. Complete metal structure solution by Namdev Infratech — from engineering to erection."
  },
  {
    title: "Peenya Pergola — Villa Terrace Transformation",
    slug: "peenya-pergola-villa-terrace",
    description: `In Peenya, one of Bangalore's most industrious neighbourhoods, a villa owner dreamed of transforming their bare terrace into a peaceful retreat above the city's bustle. Namdev Infratech made that dream a reality with a complete turnkey pergola project.

This wasn't just a pergola installation — it was a terrace transformation. We handled everything from structural assessment of the terrace to design conceptualisation, fabrication, and final installation. The metal pergola was designed to create the perfect balance between open-air freedom and sheltered comfort.

The structure's clean lines and robust construction ensure it can handle Bangalore's monsoon rains and summer heat with equal grace. Powder-coated for lasting durability, the pergola requires virtually zero maintenance — leaving the homeowner free to simply enjoy their elevated sanctuary.

Every turnkey project we undertake at Namdev Infratech follows the same principle: we don't leave until the client is delighted. This pergola didn't just add a structure to a terrace — it added a lifestyle to a home.`,
    category: "creative",
    gallery: ["/uploads/projects/peenya-pergola-1.jpg", "/uploads/projects/peenya-pergola-3.jpg", "/uploads/projects/peenya-pergola-4.jpg"],
    materials: ["Structural Steel", "Powder Coating", "Weather-resistant Finish"],
    client_type: "Residential Villa Owner",
    featured: true,
    seo_title: "Metal Pergola for Villa Terrace in Peenya Bangalore | Namdev Infratech",
    seo_description: "Turnkey metal pergola project for a villa terrace in Peenya, Bangalore. Complete design, fabrication, and installation by Namdev Infratech."
  },
  {
    title: "Terrace Pergola — Residential Retreat",
    slug: "terrace-pergola-residential",
    description: `There's something magical about a well-designed pergola — it transforms forgotten rooftop spaces into the most cherished corners of a home. This residential terrace pergola project captures that magic perfectly.

Designed for a homeowner who wanted to reclaim their terrace as a living space, this metal pergola provides the ideal framework for outdoor relaxation, entertaining, and quiet contemplation. The open-lattice design filters sunlight beautifully, creating patterns that shift and dance throughout the day.

Our fabrication team engineered the pergola for both beauty and resilience. The structural members were sized to handle additional loads — climbing plants, hanging lights, even fabric drapes — giving the homeowner endless possibilities to personalise their space over time.

Installation was completed with minimal disruption, and the finished pergola was powder-coated in a colour chosen by the homeowner to complement their home's exterior. The result is a seamless extension of the living space that feels like it was always meant to be there.

At Namdev Infratech, we understand that the best structures are the ones that disappear into the lifestyle they create. This pergola does exactly that.`,
    category: "creative",
    gallery: [],
    materials: ["Mild Steel", "Powder Coating", "Lattice Design", "Custom Color Finish"],
    client_type: "Residential Client",
    featured: false,
    seo_title: "Residential Terrace Pergola Design & Installation | Namdev Infratech",
    seo_description: "Custom residential terrace pergola with open-lattice design. Metal pergola fabrication and installation by Namdev Infratech — transforming terraces into living spaces."
  },
  {
    title: "Project Purva Westend — Complete Interior Metalwork",
    slug: "project-purva-westend",
    description: `Purva Westend is one of Bangalore's most prestigious residential addresses, and when an interior design firm was tasked with creating industrial-themed interiors for a unit here, they needed a fabrication partner who could deliver perfection. Namdev Infratech was that partner.

This multi-piece project included three distinct custom creations, each demanding different skills and sensibilities:

The Resin Table: A showstopper dining piece featuring a stunning resin top supported by our custom-designed metal frame. The frame was engineered to support the considerable weight of the resin while maintaining visual lightness — a delicate engineering balance that required both calculation and creativity.

The TV Unit: A striking metal pipe frame TV unit finished in black powder coating, with finger-jointed pine wood exterior panels for that perfect industrial-meets-warm aesthetic. Every pipe was cut to exact lengths and welded at precise angles to create a unit that's both a functional media centre and a design statement.

The Open Shelving Rack: Custom metal open shelves fabricated, black powder coated, and installed on-site. The open design creates visual depth and allows the displayed items to become part of the room's decor — exactly as the interior designers intended.

This project showcases the breadth of our creative fabrication capabilities. Three different pieces, three different challenges, one consistent standard of excellence.`,
    category: "creative",
    gallery: [],
    materials: ["MS Pipe Frame", "Black Powder Coating", "Finger Joint Pine Wood", "Resin Top", "Custom Metal Frame"],
    client_type: "Interior Design Firm",
    featured: true,
    seo_title: "Custom Metal Furniture for Purva Westend Bangalore | Namdev Infratech",
    seo_description: "Bespoke industrial-themed metal furniture for Purva Westend — resin table, TV unit, and open shelving. Custom interior metalwork by Namdev Infratech."
  },
  {
    title: "Zolo Stay — Puff Sheet Roof Structure",
    slug: "zolo-stay-puff-sheet-structure",
    description: `When Zolo Stay, one of India's leading co-living space providers, needed a reliable partner for a critical infrastructure project, they turned to Namdev Infratech. The brief was clear: design and execute a puff sheet roof structure that would provide superior thermal insulation and weather protection for their property.

This was an end-to-end solution — from structural engineering and material procurement to fabrication and installation. The puff sheet (insulated sandwich panel) roofing system was chosen for its excellent thermal properties, keeping interiors comfortable even during Bangalore's hottest months while providing complete waterproofing during the monsoons.

Our engineering team designed the supporting metal structure to distribute loads evenly across the existing building framework, ensuring long-term structural integrity without overloading the foundation. Every connection point was bolted and welded to exacting standards, and the puff sheet panels were installed with overlapping seals to eliminate any possibility of leakage.

Working with a reputed brand like Zolo Stay demanded commercial-grade professionalism — strict timelines, safety compliance, and zero-defect delivery. We delivered on every front, and the structure now serves hundreds of residents daily.

This project represents Namdev Infratech's capability in commercial and institutional projects — where scale, reliability, and reputation are everything.`,
    category: "industrial",
    gallery: ["/uploads/projects/zolo-stay-puff-structure-1.jpg", "/uploads/projects/zolo-stay-puff-structure-2.jpg", "/uploads/projects/zolo-stay-puff-structure-3.jpg", "/uploads/projects/zolo-stay-puff-structure-4.jpg"],
    materials: ["Structural Steel", "Puff Sheet / Insulated Sandwich Panels", "MS Beams & Columns", "Bolted Connections"],
    client_type: "Zolo Stay (Commercial)",
    featured: true,
    seo_title: "Puff Sheet Roof Structure for Zolo Stay | Namdev Infratech",
    seo_description: "End-to-end puff sheet roof structure design and execution for Zolo Stay co-living spaces. Commercial metal structure by Namdev Infratech."
  },
  {
    title: "Fabricated Metal Structures — Industrial Collection",
    slug: "fabricated-metal-structures-collection",
    description: `Steel is the backbone of modern infrastructure, and at Namdev Infratech, we've been shaping it into purpose-built structures for over two decades. This collection represents a range of fabricated metal structures that we've designed and executed for various industrial and commercial clients.

Each structure in this portfolio was engineered to meet specific load requirements, environmental conditions, and operational needs. From mezzanine floors and equipment platforms to storage racks and support frameworks, every piece was fabricated with the same meticulous attention to detail that defines our work.

Our fabrication process begins with detailed engineering drawings, moves through precise cutting and welding in our facility, and concludes with on-site installation and quality inspection. We use only tested, certified materials and follow industry-standard welding procedures to ensure every structure meets or exceeds safety requirements.

What sets these projects apart is our ability to customise. No two industrial environments are identical, and cookie-cutter solutions simply don't work. Our team works closely with each client to understand their specific needs, then designs and fabricates structures that fit perfectly — both physically and operationally.

This collection is a testament to the industrial heart of Namdev Infratech — where engineering precision meets real-world application.`,
    category: "industrial",
    gallery: [],
    materials: ["Structural Steel", "MS Beams", "MS Angles", "MS Plates", "Industrial Coatings"],
    client_type: "Industrial & Commercial Clients",
    featured: false,
    seo_title: "Industrial Metal Structure Fabrication | Namdev Infratech",
    seo_description: "Custom industrial metal structure fabrication — mezzanine floors, platforms, racks, and frameworks. Precision-engineered steel structures by Namdev Infratech."
  }
];

async function seedProjects() {
  const client = await pool.connect();
  try {
    console.log('Seeding projects...');
    
    for (const project of projects) {
      const result = await client.query(
        `INSERT INTO projects (title, slug, description, category, gallery, materials, client_type, featured, seo_title, seo_description)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
         ON CONFLICT (slug) DO UPDATE SET
           title = EXCLUDED.title,
           description = EXCLUDED.description,
           category = EXCLUDED.category,
           gallery = EXCLUDED.gallery,
           materials = EXCLUDED.materials,
           client_type = EXCLUDED.client_type,
           featured = EXCLUDED.featured,
           seo_title = EXCLUDED.seo_title,
           seo_description = EXCLUDED.seo_description,
           updated_at = NOW()
         RETURNING id`,
        [
          project.title,
          project.slug,
          project.description,
          project.category,
          project.gallery,
          project.materials,
          project.client_type,
          project.featured,
          project.seo_title,
          project.seo_description
        ]
      );
      console.log(`  ✓ ${project.title} (${result.rows[0].id})`);
    }
    
    console.log(`\nSuccessfully seeded ${projects.length} projects!`);
  } catch (err) {
    console.error('Error seeding projects:', err);
    throw err;
  } finally {
    client.release();
    await pool.end();
  }
}

seedProjects();
