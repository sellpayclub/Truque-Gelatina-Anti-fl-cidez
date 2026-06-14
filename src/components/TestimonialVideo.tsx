import { useEffect, memo } from 'react';

function TestimonialVideo() {
  useEffect(() => {
    const scriptId = 'converteai-sdk-testimonials';
    if (!document.getElementById(scriptId)) {
      const s = document.createElement("script");
      s.id = scriptId;
      s.src = "https://scripts.converteai.net/lib/js/smartplayer-wc/v4/sdk.js";
      s.async = true;
      document.head.appendChild(s);
    }
  }, []);

  const embedSrc = `https://scripts.converteai.net/ceaefeeb-feef-4b52-8911-9ec9de0d5b6b/players/6a2d634f4eb77420ee4b6151/v4/embed.html${window.location.search || '?'}&vl=${encodeURIComponent(window.location.href)}`;

  return (
    <div 
      id="ifr_6a2d634f4eb77420ee4b6151_wrapper" 
      style={{ margin: '0 auto', width: '100%', maxWidth: '400px', borderRadius: '1.5rem', overflow: 'hidden', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)' }}
    > 
      <div 
        style={{ position: 'relative', padding: '177.77777777777777% 0 0 0' }} 
        id="ifr_6a2d634f4eb77420ee4b6151_aspect"
      > 
        <iframe 
          frameBorder="0" 
          allowFullScreen 
          src={embedSrc} 
          id="ifr_6a2d634f4eb77420ee4b6151" 
          style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }} 
          referrerPolicy="origin"
        /> 
      </div> 
    </div>
  );
}

export default memo(TestimonialVideo, () => true);
