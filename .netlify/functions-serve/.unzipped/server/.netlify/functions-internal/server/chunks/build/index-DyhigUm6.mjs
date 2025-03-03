import { _ as __nuxt_component_0 } from './nuxt-link-3ZEquOPC.mjs';
import { withAsyncContext, ref, computed, mergeProps, withCtx, createTextVNode, createBlock, openBlock, createVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderAttr, ssrRenderList, ssrInterpolate, ssrRenderStyle, ssrRenderComponent } from 'vue/server-renderer';
import { p as publicAssetsURL } from '../nitro/nitro.mjs';
import { u as useAsyncData, q as queryCollection } from './app-DEWZwlhU.mjs';
import './server.mjs';
import 'unhead';
import '@unhead/shared';
import 'vue-router';
import 'node:http';
import 'node:https';
import 'node:fs';
import 'node:path';
import 'zod';
import 'better-sqlite3';

const _imports_0 = publicAssetsURL("/frontend.jpeg");
const _sfc_main = {
  __name: "index",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const { data: posts } = ([__temp, __restore] = withAsyncContext(() => useAsyncData(
      "projects",
      () => queryCollection("projects").all()
    )), __temp = await __temp, __restore(), __temp);
    console.log(posts);
    const categories = ref([
      "All",
      ...posts.value ? [...new Set(posts.value.map((post) => post.meta.category).filter(Boolean))] : []
      // Safe check for posts.value
    ]);
    console.log(categories);
    const selectedCategory = ref("All");
    const filteredPosts = computed(() => {
      if (selectedCategory.value === "All") {
        return posts.value;
      }
      return posts.value.filter(
        (post) => post.meta.category === selectedCategory.value
      );
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_nuxt_link = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "font-body min-h-screen bg-gray-900" }, _attrs))}><section class="hero bg-black flex items-center justify-center h-screen relative overflow-hidden"><div class="absolute inset-0 z-0 opacity-10 h-full w-full"><img${ssrRenderAttr("src", _imports_0)} alt="Frontend Developer" class="w-full h-auto object-cover"></div><div class="text-center relative z-10"><h1 class="font-heading font-bold text-5xl text-secondary mb-4 animate-fade-in-down"> Welcome to My Portfolio </h1><p class="text-lg text-primary mb-8"> I am a Frontend Developer specializing in modern web applications. </p><button class="px-6 py-3 bg-accent text-white rounded hover:bg-highlight transition duration-300"> View My Work </button></div></section><div class="filter my-8 text-center"><!--[-->`);
      ssrRenderList(categories.value, (category) => {
        _push(`<button class="inline-flex items-center px-4 py-2 mx-1 text-white bg-accent rounded hover:bg-highlight transition duration-300">${ssrInterpolate(category)}</button>`);
      });
      _push(`<!--]--></div><div class="max-w-7xl py-20 mx-auto grid grid-cols-1 md:grid-cols-2 gap-8"><!--[-->`);
      ssrRenderList(filteredPosts.value, (item, index) => {
        var _a, _b;
        _push(`<div class="group relative bg-gray-800 overflow-hidden shadow-2xl transition-all duration-300 hover:scale-105 hover:shadow-accent/30" style="${ssrRenderStyle({ "transition-delay": `${index * 50}ms` })}">`);
        if ((_a = item.meta) == null ? void 0 : _a.thumbnail) {
          _push(`<div class="relative h-96 overflow-hidden"><img${ssrRenderAttr("src", (_b = item.meta) == null ? void 0 : _b.thumbnail)}${ssrRenderAttr("alt", item.title)} class="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-110"><div class="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent opacity-70 transition-opacity duration-300 group-hover:opacity-90"></div></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<div class="p-6"><h3 class="text-2xl font-heading text-text mb-2">${ssrInterpolate(item.title)}</h3><ul class="flex flex-wrap gap-2 mb-4"><!--[-->`);
        ssrRenderList(item.meta.technologies, (tech, techIndex) => {
          _push(`<li class="px-3 py-1 bg-accent/10 text-primary rounded-full text-sm animate-pop-in" style="${ssrRenderStyle({ "animation-delay": `${techIndex * 100}ms` })}">${ssrInterpolate(tech)}</li>`);
        });
        _push(`<!--]--></ul>`);
        _push(ssrRenderComponent(_component_nuxt_link, {
          to: item.meta.link,
          target: "_blank",
          rel: "noopener noreferrer",
          class: "inline-flex items-center text-primary hover:text-highlight transition-colors duration-300"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(` View Project <svg class="w-4 h-4 ml-2 transform transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"${_scopeId}></path></svg>`);
            } else {
              return [
                createTextVNode(" View Project "),
                (openBlock(), createBlock("svg", {
                  class: "w-4 h-4 ml-2 transform transition-transform duration-300 group-hover:translate-x-1",
                  fill: "none",
                  stroke: "currentColor",
                  viewBox: "0 0 24 24"
                }, [
                  createVNode("path", {
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round",
                    "stroke-width": "2",
                    d: "M14 5l7 7m0 0l-7 7m7-7H3"
                  })
                ]))
              ];
            }
          }),
          _: 2
        }, _parent));
        _push(`</div></div>`);
      });
      _push(`<!--]--></div></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=index-DyhigUm6.mjs.map
