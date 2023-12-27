import React, { useEffect, useCallback, useRef } from "react";

const removeElId = (id) => {
  if (id) {
    let elem = document.getElementById(id);
    if (elem && elem.parentNode) elem.parentNode.removeChild(elem);
  }
};

const removeElTag = (selector) => {
  if (selector) {
    document.querySelectorAll(selector).forEach((e) => e.remove());
  }
};

function RayChat({ rayToken = null , domain=undefined , debug=false}) {
  const ref = useRef();
  const raychat = useCallback(
  () => {
    debug && console.log("raychat finally called");
    let o = rayToken;
    let t = document.createElement("script");
    t.type = "text/javascript";
    t.async = !0;
    localStorage.getItem("rayToken")
      ? (t.src =
          "https://app.raychat.io/scripts/js/" +
          o +
          "?rid=" +
          localStorage.getItem("rayToken") +
          "&href=" +
          (domain || window.location.href))
      : (t.src =
          "https://app.raychat.io/scripts/js/" +
          o +
          "?href=" +
          (domain || window.location.href));
    if (ref && ref.current) {
      ref.current.appendChild(t);
    }
  },
  [rayToken, debug, domain],
  );
  useEffect(() => {
    if (rayToken) {
      let e = document;
      let a = window;
      if ("complete" === e.readyState) {
        debug && console.log("calling raychat readyState=complete");
        raychat();
      } else {
        debug && console.log("listener to calling raychat onload");
        a.attachEvent
          ? a.attachEvent("onload", raychat)
          : a.addEventListener("load", raychat, !1);
      }
    }
    let refCurrent = ref.current;
    return () => {
      debug && console.log("cleanup raychat");
      localStorage.removeItem("rayToken");
      removeElTag("#raychatFrame + link");
      removeElTag("#raychatFrame + style");
      removeElId("raychatFrame");
      removeElId("raychat_automessage_preview_container");
      removeElId("raychatBtn");
      if (refCurrent) {
        refCurrent.innerHTML = "";
      }
    };
  }, [rayToken, debug, raychat]);

  return <div ref={ref} />;
}

export default RayChat;
