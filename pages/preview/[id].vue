<template>
    <div class="flex flex-row p-5 justify-center items-center">
        <h1 class="text-5xl">DPP Preview Page</h1>
    </div>
    <div class="flex flex-row  justify-center items-center p-10">

        <div class="card justify-center  bg-base-100 shadow-xl ">
            <div class="card-body">
                <h1 class="card-title py-2">DPP Owner: address</h1>
                <h2>POS Date Time: 00:00:00 1/1/2024 </h2>
                <h2>Made From: </h2>
                <div class="ml-10">
                    <h2>Origin: </h2>
                    <div class="ml-10">
                        <h2> Frame: France</h2>
                        <h2> Wheels: France</h2>
                    </div>
                    <h2>Deposit: </h2>
                    <div class="ml-10">
                        <h2> Frame: 100</h2>
                        <h2> Wheels: 50</h2>
                    </div>
                </div>
                <h2>Maintenance done: </h2>
                <div class="ml-10">
                    <h2>In meintenance: false</h2>
                    <h2>Maintanaces: </h2>
                    <div class="ml-10">
                        <h2>#1</h2>
                        <div class="ml-10">
                            <h2> Datetime: France</h2>
                            <h2> Reason: France</h2>
                            <h2> Work done: France</h2>
                        </div>

                    </div>
                </div>
                <h2>Changed Parts: </h2>
                <div class="ml-10">
                    <h2> #1</h2>
                    <div class="ml-10">
                        <h2>Rear wheel
                        </h2>
                        <div class="ml-10">
                            <h2> ID: 100</h2>
                            <h2> Deposit: 50</h2>
                            <h2> Date: 50</h2>
                        </div>

                    </div>
                </div>
                <h2> Ownership History</h2>
                <div class="ml-10">
                    <h2>#1</h2>
                    <div class="ml-10">
                        Date: 1/6/2205
                    </div>
                </div>
                <h2> Warranty</h2>
                <div class="ml-10">
                    <h2>Until: 1/1/2025</h2>
                    <h2>Used at: </h2>
                    <div class="ml-10">
                        Date: 1/6/2205
                        <div class="ml-10"> Changed: Front wheel</div>
                    </div>
                </div>
                <h2> Recycling</h2>
                <div class="ml-10">
                    <h2>Recycled: False</h2>
                    <h2>Recycled at: False</h2>
                    <h2>Recycled to: False</h2>
                    <div class="ml-10">
                        Date: 1/6/2205
                    </div>
                </div>
                <!-- <h2>{{ itemJson.description }}</h2>

                <h2 v-if="itemJson.size">Size: {{ itemJson.size }}</h2>
                <h2 v-if="itemJson.size_h">Size Height: {{ itemJson.size_h }}</h2>
                <h2 v-if="itemJson.size_w">Size Width: {{ itemJson.size_w }}</h2> -->
            </div>
            <!-- <figure><img src="/dummy.avif" alt="Shoes" /></figure> -->
        </div>

    </div>
    <h1 class="flex justify-center items-center p-10 text-5xl"> DPP Ownership History</h1>
    <ul class="timeline timeline-snap-icon max-md:timeline-compact timeline-vertical">
        <li>
            <div class="timeline-middle">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="h-5 w-5">
                    <path fill-rule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                        clip-rule="evenodd" />
                </svg>
            </div>
            <div class="timeline-start md:text-end mb-10">
                <time class="font-mono italic">{DateTime}</time>
                <div class="text-lg font-black">Purchase of Bike</div>
                The Apple Macintosh—later rebranded as the Macintosh 128K—is the original Apple Macintosh personal computer.
                It played a pivotal role in establishing desktop publishing as a general office function. The motherboard, a
                9 in (23 cm) CRT monitor, and a floppy drive were housed in a beige case with integrated carrying handle; it
                came with a keyboard and single-button mouse.
            </div>
            <hr />
        </li>
        <li>
            <hr />
            <div class="timeline-middle">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="h-5 w-5">
                    <path fill-rule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                        clip-rule="evenodd" />
                </svg>
            </div>
            <div class="timeline-end mb-10">
                <time class="font-mono italic">1998</time>
                <div class="text-lg font-black">iMac</div>
                The Apple Macintosh—later rebranded as the Macintosh 128K—is the original Apple Macintosh personal computer.
                It played a pivotal role in establishing desktop publishing as a general office function. The motherboard, a
                9 in (23 cm) CRT monitor, and a floppy drive were housed in a beige case with integrated carrying handle; it
                came with a keyboard and single-button mouse.
            </div>
            <hr />
        </li>
        <li>
            <hr />
            <div class="timeline-middle">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="h-5 w-5">
                    <path fill-rule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                        clip-rule="evenodd" />
                </svg>
            </div>
            <div class="timeline-start md:text-end mb-10">
                <time class="font-mono italic">2001</time>
                <div class="text-lg font-black">iPod</div>
                The iPod is a discontinued series of portable media players and multi-purpose mobile devices designed and
                marketed by Apple Inc. The first version was released on October 23, 2001, about 8+1⁄2 months after the
                Macintosh version of iTunes was released. Apple sold an estimated 450 million iPod products as of 2022.
                Apple discontinued the iPod product line on May 10, 2022. At over 20 years, the iPod brand is the oldest to
                be discontinued by Apple
            </div>
            <hr />
        </li>
        <li>
            <hr />
            <div class="timeline-middle">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="h-5 w-5">
                    <path fill-rule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                        clip-rule="evenodd" />
                </svg>
            </div>
            <div class="timeline-end mb-10">
                <time class="font-mono italic">2007</time>
                <div class="text-lg font-black">iPhone</div>
                iPhone is a line of smartphones produced by Apple Inc. that use Apple's own iOS mobile operating system. The
                first-generation iPhone was announced by then-Apple CEO Steve Jobs on January 9, 2007. Since then, Apple has
                annually released new iPhone models and iOS updates. As of November 1, 2018, more than 2.2 billion iPhones
                had been sold. As of 2022, the iPhone accounts for 15.6% of global smartphone market share
            </div>
            <hr />
        </li>
        <li>
            <hr />
            <div class="timeline-middle">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="h-5 w-5">
                    <path fill-rule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                        clip-rule="evenodd" />
                </svg>
            </div>
            <div class="timeline-start md:text-end mb-10">
                <time class="font-mono italic">2015</time>
                <div class="text-lg font-black">Apple Watch</div>
                The Apple Watch is a line of smartwatches produced by Apple Inc. It incorporates fitness tracking,
                health-oriented capabilities, and wireless telecommunication, and integrates with iOS and other Apple
                products and services
            </div>
        </li>
        <li>
            <hr />
            <div class="timeline-middle">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="h-5 w-5">
                    <path fill-rule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                        clip-rule="evenodd" />
                </svg>
            </div>
            <div class="timeline-start md:text-end mb-10">
                <time class="font-mono italic">2015</time>
                <div class="text-lg font-black">Apple Watch</div>
                The Apple Watch is a line of smartwatches produced by Apple Inc. It incorporates fitness tracking,
                health-oriented capabilities, and wireless telecommunication, and integrates with iOS and other Apple
                products and services
            </div>
        </li>
    </ul>
</template>
<script setup lang="ts">
const route = useRoute()
const { data: itemJson } = await useFetch("https://bafybeifwrdj7ircxzaqkwzacdp3gkcamnhgawmflnyh7lccusd43niyvpu.ipfs.nftstorage.link/000000000000000000000000000000000000000000000000000000000000000" + route.params.id + ".json")

// When accessing /posts/1, route.params.id will be 1
console.log(route.params.id)
</script>

<style scoped></style>