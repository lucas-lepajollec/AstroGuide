import { motion } from 'motion/react';
import { Rocket } from 'lucide-react';

export default function LoadingScreen() {
    return (
        <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, filter: 'blur(10px)' }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#030610] text-white overflow-hidden pointer-events-none"
        >
            {/* Background elements */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(16,185,129,0.1)_0%,transparent_50%)]"></div>

            <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="relative flex flex-col items-center"
            >
                {/* Logo Pulse Ring */}
                <motion.div
                    animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute inset-0 bg-emerald-500/20 rounded-full blur-xl"
                />

                {/* Logo Icon */}
                <div className="relative p-6 rounded-2xl bg-black/40 border border-emerald-500/20 backdrop-blur-md mb-6 shadow-[0_0_30px_rgba(16,185,129,0.15)]">
                    <Rocket size={48} className="text-emerald-400" />
                </div>

                {/* Text */}
                <h1 className="text-3xl font-bold tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-white to-white/60 mb-2">
                    AstroGuide
                </h1>
                <p className="text-xs font-mono tracking-[0.3em] text-emerald-400/80 uppercase">
                    Initialisation Spatiale
                </p>

                {/* Loading Bar */}
                <div className="mt-10 w-48 h-[2px] bg-white/10 rounded-full overflow-hidden relative">
                    <motion.div
                        initial={{ width: "0%" }}
                        animate={{ width: "100%" }}
                        transition={{ duration: 2.8, ease: "easeInOut" }}
                        className="absolute inset-y-0 left-0 bg-gradient-to-r from-emerald-500/50 to-emerald-400 relative"
                    >
                        {/* Glow on the bar */}
                        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-[10px] bg-emerald-400 blur-sm rounded-full"></div>
                    </motion.div>
                </div>
            </motion.div>
        </motion.div>
    );
}
