// Chạy trong Figma (Plugins → Development → Open console, hoặc qua Figma MCP use_figma) trên file DS_AI.
// Trả về nội dung cho 4 file figma-export/*.txt — dùng khi không có Figma Enterprise để gọi REST API.
const OUT = { Primitives: 'primitives.txt', Semantic: 'semantic.txt', 'Component Token': 'component.txt', Dimension: 'dimension.txt' };
const hex = (v) => {
  const h = (x) => Math.round(x * 255).toString(16).padStart(2, '0');
  return '#' + h(v.r) + h(v.g) + h(v.b) + (v.a !== undefined && v.a < 1 ? h(v.a) : '');
};
const result = {};
for (const c of await figma.variables.getLocalVariableCollectionsAsync()) {
  const file = OUT[c.name];
  if (!file) continue;
  const m = c.defaultModeId;
  const lines = [];
  for (const id of c.variableIds) {
    const v = await figma.variables.getVariableByIdAsync(id);
    let val = v.valuesByMode[m];
    if (val && val.type === 'VARIABLE_ALIAS') val = '{' + (await figma.variables.getVariableByIdAsync(val.id)).name + '}';
    else if (v.resolvedType === 'COLOR') val = hex(val);
    const desc = (v.description || '').split('·')[0].replace(/\s*→.*$/, '').trim();
    lines.push([v.name, v.resolvedType[0], val].concat(desc ? [desc] : []).join('|'));
  }
  result[file] = lines.join('\n') + '\n';
}
return result;
