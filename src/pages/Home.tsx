import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Sparkles, ChevronDown } from 'lucide-react';
import { products } from '../data/products';
import { useProductTheme } from '../hooks/useProductTheme';

export default function Home() {
  const { setProduct } = useProductTheme();
  const cyrene = products[0];
  const subProducts = products.slice(1);

  return (
    <div>
      {/* Hero - Cyrene */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full blur-[120px] animate-float"
            style={{ backgroundColor: `${cyrene.color}08` }} />
          <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full blur-[100px] animate-float"
            style={{ backgroundColor: `${cyrene.colorDark}06`, animationDelay: '2s' }} />
          <div className="absolute top-1/3 right-1/4 w-2 h-2 rounded-full animate-shimmer"
            style={{ backgroundColor: `${cyrene.color}80` }} />
          <div className="absolute bottom-1/3 left-1/4 w-1.5 h-1.5 rounded-full animate-shimmer"
            style={{ backgroundColor: '#c8a2f850', animationDelay: '1.5s' }} />
        </div>

        <div className="relative z-10 text-center px-6 max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            <Sparkles className="w-10 h-10 mx-auto"
              style={{ color: cyrene.color, filter: `drop-shadow(0 0 15px ${cyrene.color}80)` }} />
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="font-serif text-sm mb-6 tracking-[0.3em]"
            style={{ color: `${cyrene.color}80` }}
          >
            追忆永续，涟漪不散
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="font-display text-4xl md:text-6xl lg:text-7xl font-black mb-6 leading-tight tracking-wider"
            style={{ color: cyrene.color, textShadow: `0 0 40px ${cyrene.color}30` }}
          >
            CYRENE
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="text-lg md:text-xl leading-relaxed mb-4 font-serif"
            style={{ color: '#f0e0eaCC' }}
          >
            个人数字宇宙的总入口
          </motion.p>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="text-sm font-body"
            style={{ color: '#b898b080' }}
          >
            Echo of Origin — 在记忆的涟漪中，连接一切
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.8 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 2, repeat: Infinity }}>
            <ChevronDown className="w-5 h-5" style={{ color: `${cyrene.color}50` }} />
          </motion.div>
        </motion.div>
      </section>

      {/* Divider */}
      <div className="h-px max-w-content mx-auto"
        style={{ background: `linear-gradient(90deg, transparent, ${cyrene.color}, transparent)`, opacity: 0.25 }} />

      {/* Product Grid */}
      <section className="max-w-content mx-auto px-6 py-20">
        <motion.h2
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="font-display text-2xl font-bold mb-4 tracking-wider"
          style={{ color: cyrene.color }}
        >
          PRODUCTS
        </motion.h2>
        <p className="font-body text-sm mb-12" style={{ color: '#b898b060' }}>
          四条路径，四种守护，一个完整的数字宇宙
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {subProducts.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Link
                to={product.path}
                onClick={() => setProduct(product.id)}
                className="group block rounded-xl overflow-hidden border transition-all duration-500"
                style={{
                  borderColor: `${product.color}15`,
                  background: `linear-gradient(135deg, ${product.color}05, transparent)`,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = `${product.color}30`;
                  e.currentTarget.style.boxShadow = `0 0 30px ${product.color}15`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = `${product.color}15`;
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <div className="flex">
                  {/* Image */}
                  <div className="w-40 md:w-48 flex-shrink-0 overflow-hidden">
                    <img
                      src={product.coverImage}
                      alt={product.projectName}
                      className="w-full h-full object-cover brightness-[0.5] group-hover:brightness-[0.7] transition-all duration-500 group-hover:scale-105"
                    />
                  </div>

                  {/* Content */}
                  <div className="flex-1 p-5 md:p-6">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded"
                        style={{ color: product.color, backgroundColor: `${product.color}10`, border: `1px solid ${product.color}20` }}>
                        {product.pathZh}
                      </span>
                    </div>
                    <h3 className="font-display text-xl md:text-2xl font-bold mb-1 transition-all"
                      style={{ color: product.color }}>
                      {product.projectName}
                    </h3>
                    <p className="font-serif text-sm mb-2" style={{ color: `${product.color}80` }}>
                      {product.nameZh} · {product.tagline}
                    </p>
                    <p className="font-body text-xs leading-relaxed line-clamp-2" style={{ color: '#b898b070' }}>
                      {product.description}
                    </p>

                    {/* Features preview */}
                    <div className="flex flex-wrap gap-1.5 mt-3">
                      {product.features.slice(0, 3).map(f => (
                        <span key={f} className="text-[10px] font-body px-2 py-0.5 rounded-full"
                          style={{ color: `${product.color}90`, backgroundColor: `${product.color}08`, border: `1px solid ${product.color}10` }}>
                          {f}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Divider */}
      <div className="h-px max-w-content mx-auto"
        style={{ background: `linear-gradient(90deg, transparent, ${cyrene.color}, transparent)`, opacity: 0.25 }} />

      {/* Cyrene Features */}
      <section className="max-w-content mx-auto px-6 py-20">
        <h2 className="font-display text-2xl font-bold mb-8 tracking-wider"
          style={{ color: cyrene.color }}>
          CYRENE FEATURES
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {cyrene.features.map((feature, index) => (
            <motion.div
              key={feature}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="p-5 rounded-lg border transition-all duration-300 hover:border-opacity-40"
              style={{
                borderColor: `${cyrene.color}20`,
                backgroundColor: `${cyrene.color}03`,
              }}
            >
              <div className="font-mono text-xs mb-2" style={{ color: `${cyrene.color}60` }}>
                0{index + 1}
              </div>
              <div className="font-body text-sm" style={{ color: '#f0e0eaCC' }}>
                {feature}
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
