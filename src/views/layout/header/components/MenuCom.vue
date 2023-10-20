
<script>
import { Icon } from "view-design";

export default {
  props: {
    list: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  functional: true,
  render: function (h, cxt) {
    const hDomFn = (arr) => {
      const getSubFn = (item) => {
        const { icon } = item;
        const inner = [h("span", {}, item.title)];
        if (icon)
          inner.unshift(
            h(Icon, {
              props: {
                type: icon,
              },
            })
          );

        return h(
          "el-submenu",
          {
            props: {
              index: item.url,
            },
          },
          [
            h(
              "template",
              {
                slot: "title",
              },
              inner
            ),
            hDomFn(item.children),
          ]
        );
      };

      const getMenuFn = (item) => {
        const { icon } = item;
        const inner = [h("span", { slot: "title" }, item.title)];
        if (icon)
          inner.unshift(
            h(Icon, {
              props: {
                type: icon,
              },
            })
          );

        return h(
          "el-menu-item",
          {
            props: {
              index: item.url,
            },
          },
          inner
        );
      };

      return arr.map((item) => {
        const isSubmenu = item.children && item.children.length;
        return isSubmenu ? getSubFn(item) : getMenuFn(item);
      });
    };

    return hDomFn(cxt.props.list);
  },
};
</script>

<style>
</style>