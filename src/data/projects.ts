import fs from 'fs';
import path from 'path';

// Parse the directory structure of public/projects
// This makes it easy to generate the portfolio dynamically!

export interface ProjectData {
    id: string; // The URL slug e.g. "01_Dilip_Bhatia_Grand_Windsor"
    name: string;
    category: string; // e.g. "Residential"
    folderPath: string; // relative to public/projects
    link: string; // the actual page route
    coverImage: string;
    images: string[];
    client?: string;
    location?: string;
    area?: string;
    style?: string;
    description?: string;
}

const PROJECT_SPECS: Record<string, { client: string, location: string, area: string, style: string, description: string }> = {
    "Dilip Bhatia Grand Windsor": { client: "Mr. Dilip Bhatia", location: "Grand Windsor, Mumbai", area: "2,500 sq.ft", style: "Luxurious", description: "Clients wanted a luxurious house completed within 10 months. Precious marble was used for the dining table top, which became the main source of the living room's Mint Green color theme. The outcome was fabulous." },
    "Mahindra Meridian ShowFlat Alibaug": { client: "Mahindra Meridian", location: "Alibaug, Raigadh", area: "5,500 sq.ft", style: "Bali Style", description: "Show flat for the Mahindra Meridian residential complex in Alibaug. Bali-inspired aesthetic with natural materials and tropical textures." },
    "Rishikesh Shah Parel": { client: "Mr. Rishikesh Shah", location: "Parel, Mumbai", area: "5,500 sq.ft", style: "Contemporary", description: "" },
    "Nitasha Gaurav Karjat": { client: "Mrs. Nitasha Gaurav", location: "Karjat", area: "10,000 sq.ft", style: "Contemporary", description: "Doing work with the style expectations of a celebrity is one big task. Delivered successfully at a remote location." },
    "Jayant Shah Yeoor": { client: "Mr. Jayant Shah", location: "Yeoor", area: "4,800 sq.ft", style: "Bali Style", description: "" },
    "Vishal Kampani Prabhadevi": { client: "Mr. Vishal Kampani", location: "Prabhadevi, Mumbai", area: "4,200 sq.ft", style: "Neo-Classical", description: "" },
    "Hemesh Patel BARC Chembur": { client: "Mr. Hemesh Patel", location: "BARC, Chembur", area: "2,800 sq.ft", style: "Modern", description: "" },
    "Vihang Club House Thane": { client: "Vihang Club House", location: "Thane West", area: "40,500 sq.ft", style: "Bali Style", description: "One hospitality project completed in pandemic time. The G+3 building has 3 types of banquet, 20 suites in addition to a restaurant at ground floor — designed well and completed in 15 months. Challenges arose from converting an office building into a hospitality project, sorted with help of a professional MEP consultant." },
    "Mahindra Meridian Club House Alibaug": { client: "Mahindra Meridian", location: "Alibaug, Raigadh", area: "5,500 sq.ft", style: "Bali Style", description: "Working at an isolated area was a big challenge. Using natural material for interior purposes while keeping it free from all insects was a new learning. Wood panels and cane sheets for ceiling. Cement mural on the backdrop of the reception was the most beautiful element of this project." },
    "Kohar by Kanika Bandra": { client: "Kohar by Kanika", location: "Bandra West", area: "3,000 sq.ft", style: "Jewellery Boutique", description: "" },
    "KIA Showroom Thane": { client: "KIA Motors", location: "Thane West", area: "13,000 sq.ft", style: "Automotive Retail", description: "" },
    "KIA Showroom Goa": { client: "KIA Motors", location: "Goa", area: "16,000 sq.ft", style: "Automotive Retail", description: "" },
    "Manganlal Changanlal Jewellers Indore": { client: "Maganlal Changanlal", location: "Indore", area: "4,500 sq.ft", style: "Luxury Retail", description: "" },
    "HDFC Securities Mumbai": { client: "HDFC Securities", location: "Kajur Road, Mumbai", area: "25,000 sq.ft", style: "Modern Corporate", description: "" },
    "Axis Asset Management Pune": { client: "Axis Asset Management", location: "Pune", area: "13,000 sq.ft", style: "Modern Corporate", description: "" },
    "IDFC Bank Airoli": { client: "IDFC Bank", location: "Mindspace, Airoli", area: "25,000 sq.ft", style: "Modern Corporate", description: "" },
};

export function getProjects(): ProjectData[] {
    try {
        const projectsDir = path.join(process.cwd(), 'public', 'projects');

        if (!fs.existsSync(projectsDir)) {
            console.warn('[v0] Projects directory not found at:', projectsDir);
            return [];
        }

        const categories = fs.readdirSync(projectsDir).filter(f => {
            try {
                return fs.statSync(path.join(projectsDir, f)).isDirectory();
            } catch {
                return false;
            }
        });
        const projectsList: ProjectData[] = [];

        categories.forEach(categoryFolder => {
            try {
                // Format category name "01_Residential" -> "Residential"
                const categoryName = categoryFolder.replace(/^\d+_/, '').replace(/_/g, ' ');

                const categoryPath = path.join(projectsDir, categoryFolder);
                const projectFolders = fs.readdirSync(categoryPath).filter(f => {
                    try {
                        return fs.statSync(path.join(categoryPath, f)).isDirectory();
                    } catch {
                        return false;
                    }
                });

                projectFolders.forEach(projectFolder => {
                    try {
                        // Format project name "01_Dilip_Bhatia_Grand_Windsor" -> "Dilip Bhatia Grand Windsor"
                        const projectName = projectFolder.replace(/^\d+_/, '').replace(/_/g, ' ');

                        const projectPath = path.join(categoryPath, projectFolder);
                        const files = fs.readdirSync(projectPath);
                        const images = files.filter(file => /\.(png|jpe?g|webp)$/i.test(file));
                        images.sort();

                        let coverImageFile = "";
                        let largestSize = 0;

                        // Find the highest quality (largest size) image for the banner
                        images.forEach(img => {
                            // Avoid using PNGs as covers (usually floor plans)
                            if (img.toLowerCase().endsWith('.png')) return;

                            try {
                                const stats = fs.statSync(path.join(projectPath, img));
                                if (stats.size > largestSize) {
                                    largestSize = stats.size;
                                    coverImageFile = img;
                                }
                            } catch {
                                // Skip this file if we can't read stats
                            }
                        });

                        // Fallback logic if no jpegs were found
                        if (!coverImageFile && images.length > 0) {
                            images.forEach(img => {
                                try {
                                    const stats = fs.statSync(path.join(projectPath, img));
                                    if (stats.size > largestSize) {
                                        largestSize = stats.size;
                                        coverImageFile = img;
                                    }
                                } catch {
                                    // Skip this file if we can't read stats
                                }
                            });
                        }

                        // Exclude floor planning/autocad design for Manganlal Changanlal
                        if (projectName === "Manganlal Changanlal Jewellers Indore") {
                            coverImageFile = images.find(img => img.includes("photo_03")) || images.find(img => img.includes("photo_02")) || coverImageFile;
                        }

                        if (projectName === "HDFC Securities Mumbai") {
                            coverImageFile = images.find(img => img.includes("photo_04")) || coverImageFile;
                        }

                        if (projectName === "KIA Showroom Goa") {
                            coverImageFile = images.find(img => img.includes("photo_02")) || coverImageFile;
                        }

                        if (projectName === "KIA Showroom Thane") {
                            coverImageFile = images.find(img => img.includes("photo_02")) || coverImageFile;
                        }

                        const specs = PROJECT_SPECS[projectName] || {};

                        projectsList.push({
                            id: projectFolder,
                            name: projectName,
                            category: categoryName,
                            folderPath: `/projects/${categoryFolder}/${projectFolder}`,
                            link: `/portfolio/${categoryFolder}/${projectFolder}`,
                            coverImage: coverImageFile ? `/projects/${categoryFolder}/${projectFolder}/${coverImageFile}` : '',
                            images: images.map(img => `/projects/${categoryFolder}/${projectFolder}/${img}`),
                            ...specs
                        });
                    } catch (error) {
                        console.warn(`[v0] Error processing project folder ${projectFolder}:`, error);
                    }
                });
            } catch (error) {
                console.warn(`[v0] Error processing category ${categoryFolder}:`, error);
            }
        });

        return projectsList;
    } catch (error) {
        console.error('[v0] Error loading projects:', error);
        return [];
    }
}
