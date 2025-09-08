<template>
  <section class="flex flex-col md:flex-row justify-evenly items-center h-auto md:h-160 mt-10 pb-16">
    <div class="w-full max-w-2xl bg-white p-6 space-y-4">
      <h2 class="font-bold text-3xl p-2">Frågor</h2>
      <div v-for="(faq, idx) in faqs" :key="faq.question">
        <button
            @click="toggleFAQ(idx)"
            class="w-full border-transparent pl-3 border bg-pink-50 rounded-t-md flex justify-between items-center py-2 text-left text-lg font-medium text-gray-600 focus:outline-none"
        >
          {{ faq.question }}
          <span
              class="transform transition-transform duration-300 text-pink-500 pr-2 text-2xl"
          >{{ openIndex === idx ? "–" : "+" }}</span>
        </button>
        <transition name="fade">
          <div
              v-if="openIndex === idx"
              class="faq-content border-transparent shadow-lg border rounded-b-md pl-2 pb-4 text-gray-600"
          >
            {{ faq.answer }}
          </div>
        </transition>
      </div>
    </div>
    <div class="md:w-1/3 w-full pt-10 md:pt-30">
      <img src="https://www.veckansr.se/assets/images/frontend/faq/6547e5bb04a101699210683.jpg" alt="FAQ Illustration" class="rounded-lg shadow-lg w-full h-auto md:h-[400px] object-cover">
    </div>
  </section>
</template>


<script setup>
import { ref } from "vue"

// Your FAQ data (can be moved to a separate file or fetched from API)
const faqs = [
  {
    question: "Hur kan jag maximera mina besparingar genom att använda rabattsajter?",
    answer: "För att maximera ditt sparande via rabatt webbplatser kan du använda följande strategier: Regelbunden användning: Gör det till en vana att kolla rabattsajter innan du handlar online. Detta säkerställer att du inte missar några erbjudanden. Jämför erbjudanden: Använd flera rabattsajter för att jämföra och hitta de bästa erbjudandena."
  },
  {
    question: "Kan jag använda kupongkoder från webbplatser?",
    answer: "Ja, du kan använda kupongkoder från rabattsajter, men det är viktigt att följa några riktlinjer för att säkerställa att de fungerar korrekt och att du inte utsätter dig för risker: Kontrollera källan: Se till att kupongkoderna kommer från pålitliga sajter. Läs villkoren: Innan du använder en kupongkod, kontrollera att den gäller för din beställning."
  },
  {
    question: "Behöver jag registrera mig eller betala för att använda kupongwebbplatser?",
    answer: "En rabattsajt är en onlineplattform som samlar och visar rabatter, erbjudanden och kampanjer från olika återförsäljare och varumärken. Användare besöker dessa sajter för att hitta och använda digitala eller utskrivbara rabatter för att spara pengar på sina inköp online eller i fysiska butiker."
  },
  {
    question: "Hur fungerar en rabattsajt?",
    answer: "En rabattsajt fungerar i praktiken genom att den samlar och presenterar erbjudanden och rabatter från olika butiker och företag."
  },
  {
    question: "Vad är en rabatt sajt?",
    answer: "En rabattsajt är en webbplats som samlar och presenterar erbjudanden och rabatter från olika butiker och företag. Dessa sajter hjälper kunderna att hitta och utnyttja olika typer av rea, kuponger och kampanjer för att spara pengar när de handlar online eller i fysiska butiker."
  }
]

// Track the currently open FAQ (null = none open)
const openIndex = ref(null)
const toggleFAQ = idx => {
  openIndex.value = openIndex.value === idx ? null : idx
}
</script>

<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s ease-in-out;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
</style>
