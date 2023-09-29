export default defineNuxtRouteMiddleware(async (to, from) => {

    const user = useSupabaseUser()

    if (to.path === "/" && !user.value) {
        return navigateTo('/register');
    }

    if (to.path === "/" && user.value) {
        return navigateTo('/links');
    }

    if (to.path === "/links" && !user.value) {
        return navigateTo('/register');
    }


})