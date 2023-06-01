> This is a prototype for implementing I18n/localization in Next13, implements features such as: Default locale routing, string interpolation, pluralization, type-safe and autocompletion of the labels and namespaces, country tag based overriding of labels. 
>
> Its heavily inspired from `next-translate` library and follows the example on next-13 official docs on internationalization.

### Implementation

In Next-13 all components in app directory are RSC by default, which means they can read translations files directly, we use this ability to read required translations labels given variables `pathname` and `locale`. We map `pathname` to an array of `namespaces`, for the ease of maintaining translation files, eg. `/feature-1` might need namespaces `common + feature-1`.

The `page` component fetches and caches the translations for given locale and namespaces into a `globalThis` instance which is used by RSC child components to retreive translations, and for client components we use a ContextProvider to expose translations from Page component. The method `useTranslation` behaves differently based on the caller's window object, if window object is defiend we use ContextProvider otherwise we use cached results at `globalThis`.

During development each refresh will cause the translation files to be read and cached to avoid stale values when labels are updated. In production, since labels aren't going to be change, it is best that first read result is re-used on every request.

### TODO

- [x] Retreive all locale namespaces on page level component for given pathname
- [x] Usage of translation in RSC directly
- [x] Usage of translation in Client side component using Context.Provider approach
- [x] Cache first read and re-use translations on production env. and support hot reloading without hydration error on development env.
- [x] Page wrapper component to automatically fill-in required i18n namespaces based on locale and pathname key
- [x] Support for Default Locale - i.e use middleware to rewrite `/da/[path]` to `/[path]`
- [x] Support query substitution(interpolation) and plural forms
  - [x] Interpolation
  - [x] Plural forms
- [x] Country tag based overriding of labels
  - eg. `en` defines all generic labels and `en-US | en-UK` implement country specific labels variants
  - if country code is passed then override the labels in generic with more specific country labels.
- [x] Type-safety + autocompletion for namespaces and keys
- [ ] Type-safe label for namespace separated keys like `Namespace:key1` 

#### References:

- https://nextjs.org/docs/app/building-your-application/routing/internationalization
- https://github.com/vercel/next.js/issues/41980
- https://github.com/aralroca/next-translate
- https://next-intl-docs.vercel.app/docs/usage/typescript
