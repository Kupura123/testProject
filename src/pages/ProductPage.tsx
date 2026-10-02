import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Sparkles } from 'lucide-react';
import { getProductById, products } from '../data/products';
import { useProductTheme } from '../hooks/useProductTheme';
import { useEffect } from 'react';

export default function ProductPage() {
  const { productId } = useParams<{ productId: string }>();
  const product = getProductById(productId || '');
  const { setProduct } = useProductTheme();

  useEffect(() => {
    if (product) setProduct(product.id);
  }, [product, setProduct]);

  if (!product) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center">
          <Sparkles className="w-8 h-8 mx-auto mb-4" style={{ color: '#f24082' }} />
          <h2 className="font-display text-2xl mb-4" style={{ color: '#f24082' }}>产品未找到</h2>
          <Link to="/" className="font-body text-sm" style={{ color: '#f24082' }}>
            返回首页
          </Link>
        </div>
      </div>
    );
  }

  const cyrene = products[0];

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Cover */}
      <div className="w-full h-64 md:h-96 overflow-hidden relative">
        <img
          src={product.coverImage}
          alt={product.projectName}
          className="w-full h-full object-cover brightness-[0.35] saturate-[0.7]"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-dark-500 via-dark-500/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-dark-500 via-transparent to-dark-500/30" />

        {/* Content overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10 max-w-content mx-auto">
          <Link
            to="/"
            onClick={() => setProduct('cyrene')}
            className="inline-flex items-center gap-1.5 text-xs font-body mb-4 transition-colors"
            style={{ color: `${product.color}80` }}
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            CYRENE
          </Link>
          <div className="flex items-center gap-3 mb-2">
            <span className="text-xs font-mono px-2.5 py-0.5 rounded"
              style={{ color: product.color, backgroundColor: `${product.color}10`, border: `1px solid ${product.color}20` }}>
              {product.pathZh}
            </span>
          </div>
          <h1 className="font-display text-4xl md:text-5xl font-black mb-2"
            style={{ color: product.color, textShadow: `0 0 30px ${product.color}30` }}>
            {product.projectName}
          </h1>
          <p className="font-serif text-lg" style={{ color: `${product.color}90` }}>
            {product.nameZh} · {product.tagline}
          </p>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-px"
          style={{ background: `linear-gradient(90deg, transparent, ${product.color}, transparent)`, opacity: 0.3 }} />
      </div>

      {/* Body */}
      <div className="max-w-content mx-auto px-6 py-12">
        <div className="max-w-3xl">
          {/* Epithet */}
          <div className="mb-8">
            <p className="font-serif text-xl italic" style={{ color: `${product.color}90` }}>
              「{product.epithet}」
            </p>
          </div>

          {/* Description */}
          <div className="mb-12">
            <p className="font-body text-base leading-relaxed" style={{ color: '#b898b0CC' }}>
              {product.longDescription}
            </p>
          </div>

          {/* Features */}
          <div className="mb-12">
            <h3 className="font-display text-lg font-bold mb-6 tracking-wider"
              style={{ color: product.color }}>
              FEATURES
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {product.features.map((feature, index) => (
                <motion.div
                  key={feature}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.08 }}
                  className="flex items-center gap-3 p-4 rounded-lg border transition-all duration-300"
                  style={{
                    borderColor: `${product.color}15`,
                    backgroundColor: `${product.color}03`,
                  }}
                >
                  <span className="font-mono text-xs flex-shrink-0"
                    style={{ color: `${product.color}60` }}>
                    0{index + 1}
                  </span>
                  <span className="font-body text-sm" style={{ color: '#f0e0eaCC' }}>
                    {feature}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Coming Soon */}
          <div className="p-8 rounded-xl border text-center"
            style={{
              borderColor: `${product.color}15`,
              backgroundColor: `${product.color}03`,
            }}>
            <p className="font-display text-sm tracking-widest mb-2"
              style={{ color: `${product.color}60` }}>
              COMING SOON
            </p>
            <p className="font-serif text-base" style={{ color: '#b898b080' }}>
              智能体应用正在构建中
            </p>
            <p className="font-body text-xs mt-2" style={{ color: '#7a607860' }}>
              {product.nameZh}的完整功能即将上线
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
