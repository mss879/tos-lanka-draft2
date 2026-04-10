"use client";

import React, { useCallback, useLayoutEffect, useRef, useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { gsap } from 'gsap';
import Link from 'next/link';

export interface StaggeredMenuItem {
  label: string;
  ariaLabel: string;
  link: string;
  subItems?: { label: string; link: string }[];
}
export interface StaggeredMenuSocialItem {
  label: string;
  link: string;
}
export interface StaggeredMenuProps {
  position?: 'left' | 'right';
  colors?: string[];
  items?: StaggeredMenuItem[];
  socialItems?: StaggeredMenuSocialItem[];
  displaySocials?: boolean;
  displayItemNumbering?: boolean;
  className?: string;
  menuButtonColor?: string;
  openMenuButtonColor?: string;
  accentColor?: string;
  isFixed?: boolean;
  changeMenuColorOnOpen?: boolean;
  closeOnClickAway?: boolean;
  onMenuOpen?: () => void;
  onMenuClose?: () => void;
}

export const StaggeredMenu: React.FC<StaggeredMenuProps> = ({
  position = 'right',
  colors = ['#00ba34', '#3a5bfb'], // TOS Lanka Green and Blue
  items = [
    { label: 'Home', ariaLabel: 'Go to home page', link: '/' },
    { label: 'About Us', ariaLabel: 'Learn about us', link: '/about' },
    { 
      label: 'Services', ariaLabel: 'View our services', link: '/#services',
      subItems: [
        { label: 'SMT Assembly', link: '/services/smt' },
        { label: 'Systems Integration', link: '/services/system-integration' },
        { label: 'Through Hole', link: '/services/through-hole' },
        { label: 'Coating & Potting', link: '/services/coating-potting' },
        { label: 'Test & Inspection', link: '/services/test-inspection' },
        { label: 'Prototyping', link: '/services/prototype-assembling' },
        { label: 'Automotive Harnessing', link: '/services/automotive-harnessing' },
        { label: 'Inductive Components', link: '/services/inductive-components' },
        { label: 'Supply Chain', link: '/services/supply-chain' },
      ]
    },
    { label: 'Industries', ariaLabel: 'Industries we serve', link: '/industries' },
    { label: 'Certifications', ariaLabel: 'View our certifications', link: '/certification' },
    { 
      label: 'Resources', ariaLabel: 'View our resources', link: '#',
      subItems: [
        { label: 'Articles', link: '/articles' },
        { label: 'FAQ', link: '/faq' },
      ]
    },
    { label: 'Contact', ariaLabel: 'Get in touch', link: '/contact' }
  ],
  socialItems = [
    { label: 'LinkedIn', link: '#' },
    { label: 'Facebook', link: '#' },
    { label: 'Twitter', link: '#' }
  ],
  displaySocials = true,
  displayItemNumbering = true,
  className,
  menuButtonColor = '#fff', // Changed to white to match dark button background
  openMenuButtonColor = '#fff',
  changeMenuColorOnOpen = true,
  accentColor = '#3a5bfb', // TOS Blue
  isFixed = true,
  closeOnClickAway = true,
  onMenuOpen,
  onMenuClose
}: StaggeredMenuProps) => {
  const [open, setOpen] = useState(false);
  const openRef = useRef(false);
  const [mounted, setMounted] = useState(false);
  const [expandedItems, setExpandedItems] = useState<Record<number, boolean>>({});

  const toggleSubItem = (idx: number, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setExpandedItems(prev => ({ ...prev, [idx]: !prev[idx] }));
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  const panelRef = useRef<HTMLDivElement | null>(null);
  const preLayersRef = useRef<HTMLDivElement | null>(null);
  const preLayerElsRef = useRef<HTMLElement[]>([]);

  const lineTopRef = useRef<HTMLSpanElement | null>(null);
  const lineMidRef = useRef<HTMLSpanElement | null>(null);
  const lineBotRef = useRef<HTMLSpanElement | null>(null);
  const iconRef = useRef<HTMLSpanElement | null>(null);

  const textInnerRef = useRef<HTMLSpanElement | null>(null);
  const textWrapRef = useRef<HTMLSpanElement | null>(null);
  const [textLines, setTextLines] = useState<string[]>(['Menu', 'Close']);

  const openTlRef = useRef<gsap.core.Timeline | null>(null);
  const closeTweenRef = useRef<gsap.core.Tween | null>(null);
  const spinTweenRef = useRef<gsap.core.Timeline | null>(null);
  const textCycleAnimRef = useRef<gsap.core.Tween | null>(null);
  const colorTweenRef = useRef<gsap.core.Tween | null>(null);

  const toggleBtnRef = useRef<HTMLButtonElement | null>(null);
  const busyRef = useRef(false);

  const itemEntranceTweenRef = useRef<gsap.core.Tween | null>(null);

  // Initialize GSAP — must re-run after portal mounts (when `mounted` becomes true)
  useLayoutEffect(() => {
    if (!mounted) return; // portal hasn't rendered yet, refs won't be available

    const ctx = gsap.context(() => {
      const panel = panelRef.current;
      const preContainer = preLayersRef.current;

      const lineTop = lineTopRef.current;
      const lineMid = lineMidRef.current;
      const lineBot = lineBotRef.current;
      const icon = iconRef.current;
      const textInner = textInnerRef.current;

      if (!panel) return; // panel is critical

      let preLayers: HTMLElement[] = [];
      if (preContainer) {
        preLayers = Array.from(preContainer.querySelectorAll('.sm-prelayer')) as HTMLElement[];
      }
      preLayerElsRef.current = preLayers;

      const offscreen = position === 'left' ? -100 : 100;
      gsap.set([panel, ...preLayers], { xPercent: offscreen });

      if (lineTop) gsap.set(lineTop, { y: -5, rotate: 0, transformOrigin: '50% 50%' });
      if (lineMid) gsap.set(lineMid, { opacity: 1, transformOrigin: '50% 50%' });
      if (lineBot) gsap.set(lineBot, { y: 5, rotate: 0, transformOrigin: '50% 50%' });
      if (icon) gsap.set(icon, { rotate: 0, transformOrigin: '50% 50%' });
      if (textInner) gsap.set(textInner, { yPercent: 0 });

      if (toggleBtnRef.current) gsap.set(toggleBtnRef.current, { color: menuButtonColor });
    });
    return () => ctx.revert();
  }, [menuButtonColor, position, mounted]);

  const buildOpenTimeline = useCallback(() => {
    const panel = panelRef.current;
    const layers = preLayerElsRef.current;
    if (!panel) return null;

    openTlRef.current?.kill();
    if (closeTweenRef.current) {
      closeTweenRef.current.kill();
      closeTweenRef.current = null;
    }
    itemEntranceTweenRef.current?.kill();

    const itemEls = Array.from(panel.querySelectorAll('.sm-panel-itemLabel')) as HTMLElement[];
    const numberEls = Array.from(
      panel.querySelectorAll('.sm-panel-list[data-numbering] .sm-panel-item')
    ) as HTMLElement[];
    const socialTitle = panel.querySelector('.sm-socials-title') as HTMLElement | null;
    const socialLinks = Array.from(panel.querySelectorAll('.sm-socials-link')) as HTMLElement[];

    const layerStates = layers.map(el => ({ el, start: Number(gsap.getProperty(el, 'xPercent')) }));
    const panelStart = Number(gsap.getProperty(panel, 'xPercent'));

    if (itemEls.length) gsap.set(itemEls, { yPercent: 140, rotate: 10 });
    if (numberEls.length) gsap.set(numberEls, { ['--sm-num-opacity' as any]: 0 });
    if (socialTitle) gsap.set(socialTitle, { opacity: 0 });
    if (socialLinks.length) gsap.set(socialLinks, { y: 25, opacity: 0 });

    const tl = gsap.timeline({ paused: true });

    layerStates.forEach((ls, i) => {
      tl.fromTo(ls.el, { xPercent: ls.start }, { xPercent: 0, duration: 0.5, ease: 'power4.out' }, i * 0.07);
    });

    const lastTime = layerStates.length ? (layerStates.length - 1) * 0.07 : 0;
    const panelInsertTime = lastTime + (layerStates.length ? 0.08 : 0);
    const panelDuration = 0.65;

    tl.fromTo(
      panel,
      { xPercent: panelStart },
      { xPercent: 0, duration: panelDuration, ease: 'power4.out' },
      panelInsertTime
    );

    if (itemEls.length) {
      const itemsStartRatio = 0.15;
      const itemsStart = panelInsertTime + panelDuration * itemsStartRatio;

      tl.to(
        itemEls,
        { yPercent: 0, rotate: 0, duration: 1, ease: 'power4.out', stagger: { each: 0.1, from: 'start' } },
        itemsStart
      );

      if (numberEls.length) {
        tl.to(
          numberEls,
          { duration: 0.6, ease: 'power2.out', ['--sm-num-opacity' as any]: 1, stagger: { each: 0.08, from: 'start' } },
          itemsStart + 0.1
        );
      }
    }

    if (socialTitle || socialLinks.length) {
      const socialsStart = panelInsertTime + panelDuration * 0.4;

      if (socialTitle) tl.to(socialTitle, { opacity: 1, duration: 0.5, ease: 'power2.out' }, socialsStart);
      if (socialLinks.length) {
        tl.to(
          socialLinks,
          {
            y: 0,
            opacity: 1,
            duration: 0.55,
            ease: 'power3.out',
            stagger: { each: 0.08, from: 'start' },
            onComplete: () => {
              gsap.set(socialLinks, { clearProps: 'opacity' });
            }
          },
          socialsStart + 0.04
        );
      }
    }

    openTlRef.current = tl;
    return tl;
  }, [position]);

  const playOpen = useCallback(() => {
    if (busyRef.current) return;
    busyRef.current = true;
    const tl = buildOpenTimeline();
    if (tl) {
      tl.eventCallback('onComplete', () => {
        busyRef.current = false;
      });
      tl.play(0);
    } else {
      busyRef.current = false;
    }
  }, [buildOpenTimeline]);

  const playClose = useCallback(() => {
    openTlRef.current?.kill();
    openTlRef.current = null;
    itemEntranceTweenRef.current?.kill();

    const panel = panelRef.current;
    const layers = preLayerElsRef.current;
    if (!panel) return;

    const all: HTMLElement[] = [...layers, panel];
    closeTweenRef.current?.kill();

    const offscreen = position === 'left' ? -100 : 100;

    closeTweenRef.current = gsap.to(all, {
      xPercent: offscreen,
      duration: 0.32,
      ease: 'power3.in',
      overwrite: 'auto',
      onComplete: () => {
        const itemEls = Array.from(panel.querySelectorAll('.sm-panel-itemLabel')) as HTMLElement[];
        if (itemEls.length) gsap.set(itemEls, { yPercent: 140, rotate: 10 });

        const numberEls = Array.from(
          panel.querySelectorAll('.sm-panel-list[data-numbering] .sm-panel-item')
        ) as HTMLElement[];
        if (numberEls.length) gsap.set(numberEls, { ['--sm-num-opacity' as any]: 0 });

        const socialTitle = panel.querySelector('.sm-socials-title') as HTMLElement | null;
        const socialLinks = Array.from(panel.querySelectorAll('.sm-socials-link')) as HTMLElement[];
        if (socialTitle) gsap.set(socialTitle, { opacity: 0 });
        if (socialLinks.length) gsap.set(socialLinks, { y: 25, opacity: 0 });

        busyRef.current = false;
      }
    });
  }, [position]);

  const animateIcon = useCallback((opening: boolean) => {
    const icon = iconRef.current;
    const top = lineTopRef.current;
    const mid = lineMidRef.current;
    const bot = lineBotRef.current;
    if (!icon || !top || !mid || !bot) return;

    spinTweenRef.current?.kill();

    if (opening) {
      // ensure container never rotates
      gsap.set(icon, { rotate: 0, transformOrigin: '50% 50%' });
      spinTweenRef.current = gsap
        .timeline({ defaults: { ease: 'power4.out' } })
        .to(top, { y: 0, rotate: 45, duration: 0.5 }, 0)
        .to(mid, { opacity: 0, duration: 0.3 }, 0)
        .to(bot, { y: 0, rotate: -45, duration: 0.5 }, 0);
    } else {
      spinTweenRef.current = gsap
        .timeline({ defaults: { ease: 'power3.inOut' } })
        .to(top, { y: -5, rotate: 0, duration: 0.35 }, 0)
        .to(mid, { opacity: 1, duration: 0.35 }, 0)
        .to(bot, { y: 5, rotate: 0, duration: 0.35 }, 0)
        .to(icon, { rotate: 0, duration: 0.001 }, 0);
    }
  }, []);

  const animateColor = useCallback(
    (opening: boolean) => {
      const btn = toggleBtnRef.current;
      if (!btn) return;
      colorTweenRef.current?.kill();
      if (changeMenuColorOnOpen) {
        const targetColor = opening ? openMenuButtonColor : menuButtonColor;
        colorTweenRef.current = gsap.to(btn, { color: targetColor, delay: 0.18, duration: 0.3, ease: 'power2.out' });
      } else {
        gsap.set(btn, { color: menuButtonColor });
      }
    },
    [openMenuButtonColor, menuButtonColor, changeMenuColorOnOpen]
  );

  React.useEffect(() => {
    if (toggleBtnRef.current) {
      if (changeMenuColorOnOpen) {
        const targetColor = openRef.current ? openMenuButtonColor : menuButtonColor;
        gsap.set(toggleBtnRef.current, { color: targetColor });
      } else {
        gsap.set(toggleBtnRef.current, { color: menuButtonColor });
      }
    }
  }, [changeMenuColorOnOpen, menuButtonColor, openMenuButtonColor]);

  const animateText = useCallback((opening: boolean) => {
    const inner = textInnerRef.current;
    if (!inner) return;

    textCycleAnimRef.current?.kill();

    const currentLabel = opening ? 'Menu' : 'Close';
    const targetLabel = opening ? 'Close' : 'Menu';
    const cycles = 3;

    const seq: string[] = [currentLabel];
    let last = currentLabel;
    for (let i = 0; i < cycles; i++) {
      last = last === 'Menu' ? 'Close' : 'Menu';
      seq.push(last);
    }
    if (last !== targetLabel) seq.push(targetLabel);
    seq.push(targetLabel);

    setTextLines(seq);
    gsap.set(inner, { yPercent: 0 });

    const lineCount = seq.length;
    const finalShift = ((lineCount - 1) / lineCount) * 100;

    textCycleAnimRef.current = gsap.to(inner, {
      yPercent: -finalShift,
      duration: 0.5 + lineCount * 0.07,
      ease: 'power4.out'
    });
  }, []);

  const toggleMenu = useCallback(() => {
    const target = !openRef.current;
    openRef.current = target;
    setOpen(target);

    if (target) {
      onMenuOpen?.();
      playOpen();
    } else {
      onMenuClose?.();
      playClose();
    }

    animateIcon(target);
    animateColor(target);
    animateText(target);
  }, [playOpen, playClose, animateIcon, animateColor, animateText, onMenuOpen, onMenuClose]);

  const closeMenu = useCallback(() => {
    if (openRef.current) {
      openRef.current = false;
      setOpen(false);
      onMenuClose?.();
      playClose();
      animateIcon(false);
      animateColor(false);
      animateText(false);
    }
  }, [playClose, animateIcon, animateColor, animateText, onMenuClose]);

  React.useEffect(() => {
    if (!closeOnClickAway || !open) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (
        panelRef.current &&
        !panelRef.current.contains(event.target as Node) &&
        toggleBtnRef.current &&
        !toggleBtnRef.current.contains(event.target as Node)
      ) {
        closeMenu();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [closeOnClickAway, open, closeMenu]);

  return (
    <div
      className={`sm-scope relative inline-block`}
    >
      {/* Toggle Button inline, instead of in a header overlay */}
      <button
        ref={toggleBtnRef}
        className={`sm-toggle relative z-50 flex items-center gap-2 h-[44px] px-5 rounded-xl bg-brand-surface-light text-white hover:bg-brand-surface transition-colors border border-brand-outline shadow-md cursor-pointer leading-none overflow-visible ${
          open ? '!text-white' : ''
        }`}
        aria-label={open ? 'Close menu' : 'Open menu'}
        aria-expanded={open}
        aria-controls="staggered-menu-panel"
        onClick={toggleMenu}
        type="button"
      >
        <span
          ref={iconRef}
          className="sm-icon relative w-[18px] h-[14px] shrink-0 inline-flex flex-col justify-center [will-change:transform]"
          aria-hidden="true"
        >
          <span
            ref={lineTopRef}
            className="sm-icon-line absolute left-0 top-1/2 -translate-y-1/2 w-full h-[2px] bg-white rounded-[2px] [will-change:transform,opacity]"
            style={{ y: -5 }}
          />
          <span
            ref={lineMidRef}
            className="sm-icon-line absolute left-0 top-1/2 -translate-y-1/2 w-full h-[2px] bg-white rounded-[2px] [will-change:transform,opacity]"
          />
          <span
            ref={lineBotRef}
            className="sm-icon-line absolute left-0 top-1/2 -translate-y-1/2 w-full h-[2px] bg-white rounded-[2px] [will-change:transform,opacity]"
            style={{ y: 5 }}
          />
        </span>
        <span
          ref={textWrapRef}
          className="sm-toggle-textWrap relative inline-block h-[1em] overflow-hidden whitespace-nowrap text-sm w-[3.5em]"
          aria-hidden="true"
        >
          <span ref={textInnerRef} className="sm-toggle-textInner flex flex-col leading-none">
            {textLines.map((l, i) => (
              <span className="sm-toggle-line block h-[1em] leading-none text-sm font-bold tracking-wider uppercase" key={i}>
                {l}
              </span>
            ))}
          </span>
        </span>
      </button>

      {/* Floating Animated Modal Overlay (Portaled) */}
      {mounted && createPortal(
        <div
          className={
            (className ? className + ' ' : '') +
            `staggered-menu-wrapper fixed top-0 left-0 w-screen h-screen z-[999] ${open ? 'pointer-events-auto' : 'pointer-events-none'}`
          }
          style={{
            zIndex: 9999,
            ...(accentColor ? { ['--sm-accent' as any]: accentColor } : {}),
            visibility: open ? 'visible' : 'hidden',
          } as React.CSSProperties}
          data-position={position}
          data-open={open || undefined}
        >
        <div
          ref={preLayersRef}
          className="sm-prelayers absolute top-0 right-0 bottom-0 pointer-events-none z-[5]"
          aria-hidden="true"
        >
          {(() => {
            const raw = colors && colors.length ? colors.slice(0, 4) : ['#1e1e22', '#35353c'];
            let arr = [...raw];
            if (arr.length >= 3) {
              const mid = Math.floor(arr.length / 2);
              arr.splice(mid, 1);
            }
            return arr.map((c, i) => (
              <div
                key={i}
                className="sm-prelayer absolute top-0 right-0 h-full w-full translate-x-0 lg:rounded-l-[32px]"
                style={{ background: c }}
              />
            ));
          })()}
        </div>

        <aside
          id="staggered-menu-panel"
          ref={panelRef}
          className="staggered-menu-panel absolute top-0 right-0 h-full bg-white flex flex-col overflow-hidden z-10 pointer-events-auto shadow-2xl lg:rounded-l-[32px]"
          aria-hidden={!open}
        >
          {/* Close Button — inside the panel so it's always visible */}
          <div className="sticky top-0 z-50 flex justify-end p-4 sm:p-6 bg-white">
            <button
              onClick={() => closeMenu()}
              className="flex items-center gap-2 py-2.5 px-5 rounded-xl bg-black text-white hover:bg-black/80 transition-colors shadow-lg cursor-pointer"
              aria-label="Close menu"
              type="button"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <line x1="3" y1="3" x2="13" y2="13" />
                <line x1="13" y1="3" x2="3" y2="13" />
              </svg>
              <span className="text-sm font-bold tracking-wider uppercase">Close</span>
            </button>
          </div>

          <div className="sm-panel-inner flex-1 flex flex-col gap-5 px-6 md:px-10">
            <ul
              className="sm-panel-list list-none m-0 p-0 flex flex-col gap-2 md:gap-3"
              role="list"
              data-numbering={displayItemNumbering || undefined}
            >
              {items && items.length ? (
                items.map((it, idx) => {
                  const hasSubItems = it.subItems && it.subItems.length > 0;
                  const isExpanded = expandedItems[idx];
                  
                  return (
                    <li className="sm-panel-itemWrap relative overflow-hidden leading-none" key={it.label + idx}>
                      <div className="flex items-center">
                        <Link
                          className="sm-panel-item relative text-black font-medium font-heading text-[2.2rem] md:text-[3.2rem] cursor-pointer leading-tight tracking-[-0.04em] transition-[background,color] duration-150 ease-linear inline-block no-underline pr-[0.5em] hover:text-brand-tertiary"
                          href={hasSubItems ? '#' : it.link}
                          aria-label={it.ariaLabel}
                          data-index={idx + 1}
                          onClick={(e) => {
                            if (hasSubItems) {
                              toggleSubItem(idx, e);
                            } else {
                              closeMenu();
                            }
                          }}
                        >
                          <span className="sm-panel-itemLabel inline-flex items-center [transform-origin:50%_100%] will-change-transform">
                            {it.label}
                            {hasSubItems && (
                              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={`ml-3 mt-1 text-brand-primary transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}>
                                <polyline points="6 9 12 15 18 9"></polyline>
                              </svg>
                            )}
                          </span>
                        </Link>
                      </div>
                      
                      {/* Sub-Items Accordion */}
                      {hasSubItems && (
                        <div 
                          className={`grid transition-[grid-template-rows,opacity,padding] duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] ${isExpanded ? 'grid-rows-[1fr] opacity-100 pt-3 pb-2' : 'grid-rows-[0fr] opacity-0 pt-0 pb-0'}`}
                        >
                          <ul className="overflow-hidden flex flex-col gap-3 pl-4 md:pl-8 border-l-2 border-brand-outline/30 ml-2">
                            {it.subItems!.map((sub, sIdx) => (
                              <li key={sIdx + sub.label}>
                                <Link 
                                  href={sub.link} 
                                  className="text-[1.1rem] md:text-[1.3rem] font-medium text-black/60 hover:text-brand-tertiary transition-colors block py-1"
                                  onClick={() => closeMenu()}
                                >
                                  {sub.label}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </li>
                  );
                })
              ) : null}
            </ul>

            {displaySocials && (
              <div className="sm-socials mt-2 pt-4 flex flex-col gap-3 border-t border-black/10" aria-label="Social links">
                <h3 className="sm-socials-title m-0 text-sm font-semibold tracking-wider uppercase [color:var(--sm-accent,#00ba34)]">Connect</h3>
                <div className="sm-socials-list flex flex-row items-center gap-3 flex-wrap">
                  {/* WhatsApp */}
                  <a
                    href="https://wa.me/+94715349933"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="sm-socials-link relative flex items-center justify-center w-10 h-10 rounded-xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden group shadow-[0_5px_15px_rgba(0,0,0,0.15)] bg-[#25D366]"
                  >
                    <div className="absolute inset-0 rounded-xl shadow-[inset_0_2px_4px_rgba(255,255,255,0.7)] pointer-events-none" />
                    <div className="absolute inset-0 rounded-xl shadow-[inset_0_-2px_6px_rgba(0,0,0,0.3)] pointer-events-none" />
                    <div className="absolute top-0 left-0 w-full h-[45%] bg-gradient-to-b from-white/40 to-transparent rounded-t-xl pointer-events-none" />
                    <div className="absolute inset-0 rounded-xl border border-white/30 group-hover:border-white/60 transition-colors duration-300 pointer-events-none" />
                    <div className="relative z-10 text-white drop-shadow-[0_2px_3px_rgba(0,0,0,0.5)] group-hover:scale-110 transition-transform duration-300">
                      <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.888-.788-1.489-1.761-1.662-2.06-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/>
                      </svg>
                    </div>
                  </a>

                  {/* Facebook */}
                  <a
                    href="https://web.facebook.com/toslanka"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="sm-socials-link relative flex items-center justify-center w-10 h-10 rounded-xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden group shadow-[0_5px_15px_rgba(0,0,0,0.15)] bg-[#1b4195]"
                  >
                    <div className="absolute inset-0 rounded-xl shadow-[inset_0_2px_4px_rgba(255,255,255,0.7)] pointer-events-none" />
                    <div className="absolute inset-0 rounded-xl shadow-[inset_0_-2px_6px_rgba(0,0,0,0.3)] pointer-events-none" />
                    <div className="absolute top-0 left-0 w-full h-[45%] bg-gradient-to-b from-white/40 to-transparent rounded-t-xl pointer-events-none" />
                    <div className="absolute inset-0 rounded-xl border border-white/30 group-hover:border-white/60 transition-colors duration-300 pointer-events-none" />
                    <div className="relative z-10 text-white drop-shadow-[0_2px_3px_rgba(0,0,0,0.5)] group-hover:scale-110 transition-transform duration-300">
                      <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path d="M9 8H6v4h3v12h5V12h3.642L18 8h-4V6.333C14 5.378 14.192 5 15.115 5H18V0h-3.808C10.596 0 9 1.583 9 4.615V8z"/>
                      </svg>
                    </div>
                  </a>

                  {/* LinkedIn */}
                  <a
                    href="https://www.linkedin.com/company/tos-lanka-co-pvt-ltd/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="sm-socials-link relative flex items-center justify-center w-10 h-10 rounded-xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden group shadow-[0_5px_15px_rgba(0,0,0,0.15)] bg-[#0f72aa]"
                  >
                    <div className="absolute inset-0 rounded-xl shadow-[inset_0_2px_4px_rgba(255,255,255,0.7)] pointer-events-none" />
                    <div className="absolute inset-0 rounded-xl shadow-[inset_0_-2px_6px_rgba(0,0,0,0.3)] pointer-events-none" />
                    <div className="absolute top-0 left-0 w-full h-[45%] bg-gradient-to-b from-white/40 to-transparent rounded-t-xl pointer-events-none" />
                    <div className="absolute inset-0 rounded-xl border border-white/30 group-hover:border-white/60 transition-colors duration-300 pointer-events-none" />
                    <div className="relative z-10 text-white drop-shadow-[0_2px_3px_rgba(0,0,0,0.5)] group-hover:scale-110 transition-transform duration-300">
                      <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z"/>
                      </svg>
                    </div>
                  </a>
                </div>
              </div>
            )}
          </div>
        </aside>
      </div>,
      document.body
      )}

      <style>{`
.sm-scope .staggered-menu-wrapper { position: fixed; width: 100vw; height: 100vh; z-index: 40; pointer-events: none; top: 0; left: 0; }
.sm-scope .sm-toggle:focus-visible { outline: 2px solid #ffffffaa; outline-offset: 4px; border-radius: 4px; }
.sm-scope .sm-panel-itemWrap { position: relative; overflow: hidden; line-height: 1; }
.sm-scope .staggered-menu-panel { position: absolute; top: 0; right: 0; width: clamp(320px, 45vw, 550px); height: 100%; display: flex; flex-direction: column; overflow-y: auto; z-index: 10; padding-top: 5rem; }
.sm-scope [data-position='left'] .staggered-menu-panel { right: auto; left: 0; }
.sm-scope .sm-prelayers { position: absolute; top: 0; right: 0; bottom: 0; width: clamp(320px, 45vw, 550px); pointer-events: none; z-index: 5; }
.sm-scope [data-position='left'] .sm-prelayers { right: auto; left: 0; }
.sm-scope .sm-prelayer { position: absolute; top: 0; right: 0; height: 100%; width: 100%; transform: translateX(0); }
.sm-scope .sm-panel-list[data-numbering] { counter-reset: smItem; }
.sm-scope .sm-panel-list[data-numbering] .sm-panel-item::before { 
  counter-increment: smItem; 
  content: "0" counter(smItem); 
  position: absolute; 
  top: 0.15em; 
  left: -2em; 
  font-size: 16px; 
  font-weight: 600; 
  color: var(--sm-accent, #ff0000); 
  opacity: var(--sm-num-opacity, 0); 
  font-family: inherit;
}
@media (max-width: 1024px) { 
  .sm-scope .staggered-menu-panel, .sm-scope .sm-prelayers { width: 100%; left: 0; right: 0; } 
  .sm-scope .sm-panel-list[data-numbering] .sm-panel-item::before { display: none; }
}
      `}</style>
    </div>
  );
};

export default StaggeredMenu;
