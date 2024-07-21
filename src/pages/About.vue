<template>
  <article class="flex-col w-full items-center">
    <section>
      <h1 class="text-4xl text-center p-4 pt-8">About</h1>
    </section>
    <div class="w-2/3 mx-auto">
      <section class="py-4">
        <AboutAnchor
          anchor-id="what-is-this-tool"
          heading="What is this tool?"
        ></AboutAnchor>
        <p>
          This is a tool for calculating
          <a href="https://www.tdwg.org/community/cd/mids/">MIDS</a>
          scores on biological datasets uploaded to
          <a href="https://gbif.org">GBIF</a>.
        </p>
        <p>
          The goal of this tool is to make it easy for anyone to check the
          current MIDS level of their GBIF dataset without having to download
          the data themselves or run specialist software on their computer.
        </p>
        <p>
          If you would like to get a more accurate* and feature-full breakdown
          of a dataset's MIDS level, the excellent
          <a href="https://github.com/AgentschapPlantentuinMeise/MIDSCalculator"
            >MIDS Calculator</a
          >
          app is available to download and use.
        </p>
        <p class="italic pt-4 text-sm">*see caveats below</p>
      </section>
      <section class="py-4">
        <AboutAnchor
          anchor-id="what-is-mids"
          heading="What is MIDS?"
        ></AboutAnchor>
        <p>
          MIDS is the Minimum Information about a Digital Specimen, a standard
          under construction by the
          <a href="https://www.tdwg.org">TDWG</a>
          MIDS task group.
        </p>
        <p>
          At its core, MIDS is a specification for measuring, in a machine
          actionable way, the digitisation status of a digital specimen against
          a set of levels. MIDS defines these levels (0, 1, 2, and 3) as well as
          the information elements that make up these levels. Each information
          element is made up of a logical combination of one or more fields
          which must be present in the record. If all the requirements of each
          information element in a level is met by a record, it has met that
          MIDS level. To meet the requirements of a higher MIDS level, all
          previous MIDS levels must also be met. MIDS is a measure of a record's
          completeness, not a measure of the quality of the data in those
          fields.
        </p>
      </section>
      <section class="py-4">
        <AboutAnchor
          anchor-id="how-does-it-work"
          heading="How does it work?"
        ></AboutAnchor>
        <p>
          This tool uses the GBIF API to calculate a MIDS score for a given
          dataset. To do this, the MIDS
          <a href="https://dwc.tdwg.org">DwC</a>
          mappings have been used to create a mapping to the GBIF predicate API.
        </p>
        <p>
          The
          <a
            href="https://techdocs.gbif.org/en/openapi/v1/occurrence#/Searching%20occurrences/predicateSearchOccurrence"
            >GBIF predicate API</a
          >
          provides
          <a
            href="https://techdocs.gbif.org/en/data-use/api-downloads#predicates"
            >advanced search capability</a
          >
          over the standard occurrence search API, allowing this tool to perform
          existence checks on fields and combine terms using logical operators.
        </p>
        <p class="pt-2">
          A breakdown of the predicate mappings in use by this tool:
        </p>
        <div v-for="(elements, level) in levels" class="pl-4 pt-2">
          <h3>MIDS Level {{ level }}</h3>
          <details v-for="(predicate, element) in elements" class="text-sm">
            <summary class="cursor-pointer">{{ element }}</summary>
            <pre class="p-4 bg-gray-50">{{ predicate }}</pre>
          </details>
        </div>
      </section>
      <section class="py-4">
        <AboutAnchor anchor-id="caveats" heading="Caveats!"></AboutAnchor>
        <ul class="list-disc pl-6">
          <li>
            This tool is very much a toy project and once GBIF implement MIDS
            into their data models, this tool become redundant.
          </li>
          <li>
            This tool is still in development as is the MIDS standard so things
            may change without notice.
          </li>
          <li>
            The GBIF predicate API is an extremely useful tool for advanced
            searching, however, it doesn't provide a complete mapping of all DwC
            terms. This means that for some MIDS elements there are fewer fields
            available to check and the resulting MIDS scores may not be as
            accurate as if a downloaded version of the data is used. To try a
            calculator which works on GBIF downloads, check out the excellent
            <a
              href="https://github.com/AgentschapPlantentuinMeise/MIDSCalculator"
              >MIDS Calculator</a
            >.
          </li>
        </ul>
      </section>
      <section class="pt-4 pb-12">
        <AboutAnchor anchor-id="contribute" heading="Contibute"></AboutAnchor>
        <p>
          If you think you've spotted something incorrect or would like to
          suggest an improvement, please do so on
          <a href="https://github.com/NaturalHistoryMuseum/gamc/issue"
            >GitHub</a
          >
          by creating an issue or opening a pull request.
        </p>
      </section>
    </div>
  </article>
</template>

<script setup>
import {
  mids0Elements,
  mids1Elements,
  mids2Elements,
  mids3Elements,
} from '../lib/mids.js';
import AboutAnchor from '../components/AboutAnchor.vue';

const levels = [mids0Elements, mids1Elements, mids2Elements, mids3Elements];
</script>

<style scoped></style>
