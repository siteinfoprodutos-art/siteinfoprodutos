sed -i '/<\/section>/!b;n;/<\/div>/!b;i\
      {relatedProducts.length > 0 && (\
        <section className="py-24 bg-[#0A0A0A] border-t border-white/5">\
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">\
            <div className="text-center space-y-3">\
              <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">Você também pode gostar</h2>\
              <p className="text-slate-400">Outras ferramentas que podem ajudar na sua rotina.</p>\
            </div>\
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">\
              {relatedProducts.map(relProduct => (\
                <ProductCard\
                  key={relProduct.id}\
                  product={relProduct}\
                  onSelect={(slug) => {\
                    // use navigate instead of link, wait we have onNavigate prop?\
                  }}\
                />\
              ))}\
            </div>\
          </div>\
        </section>\
      )}
' src/pages/ProductDetailPage.tsx
