const fs = require('fs');

let content = fs.readFileSync('src/config/brand.ts', 'utf8');

// Add supportEmail and supportWhatsApp to the interface
content = content.replace(
  /export interface BrandConfig {\s*name: string;\s*slogan: string;\s*description: string;\s*presentation: string;\s*contact: {\s*email: string;\s*/,
  `export interface BrandConfig {
  name: string;
  slogan: string;
  description: string;
  presentation: string;
  contact: {
    email: string;
    supportEmail: string;
    supportWhatsApp: string;
`
);

// Add values to the object
content = content.replace(
  /email: "contato@alstudiotech.com",\s*/,
  `email: "contato@alstudiotech.com",
    supportEmail: "suporte@alstudiotech.com",
    supportWhatsApp: "5511999999999",
`
);

fs.writeFileSync('src/config/brand.ts', content);
