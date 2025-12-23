import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { useResponsive } from "../hooks/useResponsive";

/**
 * Premium "Tile Break" Transition
 * - Creates a grid of tiles covering the screen
 * - Animates them out in a mosaic pattern to reveal content
 * - GPU optimized using transforms
 */
const TileTransition = ({ onComplete }) => {
    const containerRef = useRef(null);
    const { isMobile, prefersReducedMotion } = useResponsive();

    useEffect(() => {
        if (prefersReducedMotion) {
            if (onComplete) onComplete();
            return;
        }

        const container = containerRef.current;
        if (!container) return;

        // Grid Configuration
        const cols = isMobile ? 4 : 8;
        const rows = isMobile ? 6 : 6;
        const tiles = [];

        // Create Grid
        for (let r = 0; r < rows; r++) {
            for (let c = 0; c < cols; c++) {
                const tile = document.createElement("div");
                tile.className = "transition-tile";
                tile.style.width = `${100 / cols}%`;
                tile.style.height = `${100 / rows}%`;
                tile.style.position = "absolute";
                tile.style.left = `${(c / cols) * 100}%`;
                tile.style.top = `${(r / rows) * 100}%`;
                tile.style.backgroundColor = "#000"; // Start black (or theme color)
                tile.style.transformOrigin = "center center";
                tile.style.zIndex = 2; // Above content

                // Add subtle border for "mosaic" feel (optional, maybe too busy)
                // tile.style.border = "1px solid rgba(255,255,255,0.05)";

                container.appendChild(tile);
                tiles.push(tile);
            }
        }

        // Animation Timeline
        const tl = gsap.timeline({
            onComplete: () => {
                if (onComplete) onComplete();
                // Fade out container to remove from DOM smoothly
                gsap.to(container, {
                    opacity: 0,
                    duration: 0.5,
                    onComplete: () => {
                        if (container.parentNode) container.parentNode.removeChild(container);
                    }
                });
            }
        });

        // 1. Enter: Tiles are already there (black screen)
        // Actually, we want them to APPEAR to cover the screen first?
        // Requirement: "Screen breaks into animated tiles... reveal About section"
        // Usually this implies: Hero is visible -> Tiles appear (Mask) -> Transition Logic -> Tiles Break reveal new section.
        // OR: Hero is visible -> Tiles are transparent -> Tiles turn Black (Cover) -> Scroll -> Tiles Break (Reveal).

        // Let's go with: 
        // 1. Instant Black Cover (or fast fade in) to hide the scroll jump.
        // 2. Then Break.

        gsap.set(tiles, { scale: 0, opacity: 0 });

        // Step 1: Cover Screen (Growth)
        tl.to(tiles, {
            scale: 1.01, // Slight overlap to prevent cracks
            opacity: 1,
            duration: 0.4,
            stagger: {
                amount: 0.3,
                grid: [rows, cols],
                from: "center"
            },
            ease: "power2.inOut"
        })
            .add(() => {
                // Here we trigger the "scroll" or "page switch" while screen is full black
                // But we wait a moment
            })
            // Step 2: Break Away (Reveal)
            .to(tiles, {
                scale: 0,
                opacity: 0,
                rotation: () => Math.random() * 90 - 45,
                x: () => Math.random() * 100 - 50,
                y: () => Math.random() * 100 - 50,
                duration: 0.8,
                stagger: {
                    amount: 0.5,
                    grid: [rows, cols],
                    from: "random" // Mosaic break feel
                },
                ease: "back.in(1.7)",
                delay: 0.2 // Pause at full black
            });

    }, [isMobile, prefersReducedMotion, onComplete]);

    if (prefersReducedMotion) return null;

    return (
        <div
            ref={containerRef}
            style={{
                position: "fixed",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                zIndex: 9999,
                pointerEvents: "none",
                display: "flex",
                flexWrap: "wrap"
            }}
        />
    );
};

export default TileTransition;
