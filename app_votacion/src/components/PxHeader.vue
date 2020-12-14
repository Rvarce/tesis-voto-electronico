<template>
    <header class="shadow w-screen">
        <nav
            class="flex-items-center justify-between flex-wrap bg-white-400 p-6"
        >
            <div class="flex itemd-center flex-shronk-0 text-gray-600 mr-6">
                <!-- <px-icon class="mr-3" /> -->
                <span class="font-demibold text-xl traking-tight"
                    >ELECCIONES PRESIDENCIALES 2021</span
                >
            </div>
            <div
                class="hidden 
               sn:block 
               w-full block 
               flex-grow 
               lg:flex 
               lg:items-center 
               lg:w-auto"
            >
                <div class="text-sm lg:flex-grow"></div>
            </div>
        </nav>
    </header>
</template>
<script>
//import PxIcon from '@/components/PxIcon'
export default {
    name: 'PxHeader'
    // components: { PxIcon }
}
</script>
