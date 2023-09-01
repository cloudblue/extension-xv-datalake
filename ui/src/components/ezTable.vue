<template>
  <table>
    <thead>
      <tr>
        <th
          v-for="header in headers"
          :key="header.value"
          :style="{ width: header.width || 'auto' }"
          role="columnheader"
        >
          {{ header.label }}
        </th>
      </tr>
    </thead>
    <tbody>
      <template v-for="(item, idx) in items">
        <slot
          name="items"
          v-bind="{ item, headers }"
        >
          <tr :key="`tr-${idx}`">
            <td
              v-for="header in headers"
              :key="header.value"
            >
              <slot
                :name="header.value"
                v-bind="item"
              />
            </td>
          </tr>
        </slot>
      </template>
    </tbody>
  </table>
</template>

<script>
export default {
  props: {
    headers: {
      type: Array,
      required: true,
    },

    items: {
      type: Array,
      required: true,
    },
  },
};
</script>

<style lang="stylus" scoped>
table {
  border-collapse: collapse;
  border-spacing: 0;
  width: 100%;
  max-width: 100%;
  table-layout: fixed;
}

thead {
  border-top: 1px solid #e0e0e0;
  border-bottom: 1px solid #e0e0e0;
  background-color: #f5f5f5;
}

tr {
  border-bottom: 1px solid #e0e0e0;

  &:last-child {
    border-bottom: none;
  }
}

th {
  box-sizing: content-box;
  height: 32px;
  min-height: 32px;
  overflow: hidden;
  padding-right: 12px;
  padding-left: 12px;
  font-size: 12px;
  line-height: 20px;
  letter-spacing: 0.5px;
  color: #707070;
  text-transform: uppercase;
  text-align: left;
  font-weight: bold;

  &:first-child {
    padding-left: 24px;
    border-left: none;
  }

  &:last-child {
    border-right: none;
    padding-right: 24px;
  }
}

td {
  box-sizing: content-box;
  height: 48px;
  font-size: 14px;
  padding-right: 12px;
  padding-left: 12px;

  &:first-child {
    padding-left: 24px;
  }

  &:last-child {
    padding-right: 24px;
  }
}
</style>
