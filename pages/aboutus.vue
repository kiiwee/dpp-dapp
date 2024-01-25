<template>
    <div>
        <main class="flex-1">
            <section class="w-full pt-12 md:pt-24 lg:pt-32">
                <div class="px-4 md:px-6 space-y-10 xl:space-y-16">
                    <div class="grid max-w-[1300px] mx-auto gap-4 px-4 sm:px-6 md:px-10 md:grid-cols-2 md:gap-16">
                        <div>
                            <h1
                                class="lg:leading-tighter text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl xl:text-[3.4rem] 2xl:text-[3.75rem]">
                                About Us
                            </h1>
                        </div>
                        <div class="flex flex-col items-start space-y-4">
                            <p class="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                                Our project is dedicated to providing the best service in the industry. We have a team of
                                professionals who are passionate about what they do and are committed to delivering
                                excellence.
                            </p>
                        </div>
                    </div>
                    <!-- <img src="/public/placeholder.svg" width="1270" height="300" alt="Team"
                        class="mx-auto aspect-[3/1] overflow-hidden rounded-t-xl object-cover" /> -->
                    <div class="mt-12">
                        <h2 class="text-2xl font-bold text-center">Meet The Team</h2>
                        <div class="flex flex-col md:flex-row justify-center items-center gap-8 mt-8">
                            <div class="flex flex-col items-center">
                                <img src="/Ilian.jpg" width="100" height="100" alt="Team Member 1" class="rounded-full"
                                    style="aspect-ratio: 100 / 100; object-fit: cover;" />
                                <h3 class="mt-4 text-lg font-semibold">Ilian Stoev</h3>
                                <p class="mt-2 text-center text-gray-500">Wanted by Interpol</p>
                            </div>
                            <div class="flex flex-col items-center">
                                <img src="/Ioan.jpg" width="100" height="100" alt="Team Member 2" class="rounded-full"
                                    style="aspect-ratio: 100 / 100; object-fit: cover;" />
                                <h3 class="mt-4 text-lg font-semibold">Ioan Popa</h3>
                                <p class="mt-2 text-center text-gray-500">Wanted by the Vatican Police</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

        </main>
    </div>
</template>

<script setup lang="ts">

</script>

<style scoped></style>