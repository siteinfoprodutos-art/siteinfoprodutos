const fs = require('fs');

let content = fs.readFileSync('src/components/Footer.tsx', 'utf8');

// Remove the Acessar produtos link
content = content.replace(
  /<li className="pt-2">\s*<button\s*type="button"\s*onClick=\{\(\) => onNavigate\('\/acessar'\)\}\s*className="hover:text-white transition-colors flex items-center gap-1\.5 opacity-80"\s*>\s*Acessar produtos\s*<\/button>\s*<\/li>/,
  ''
);

fs.writeFileSync('src/components/Footer.tsx', content);
