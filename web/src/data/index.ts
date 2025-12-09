function randomItem() {
  const isFile = Math.random() > 0.5;

  interface Item {
    _id: string;
    name: string;
    isFile: boolean;
    size?: number;
    updatedAt: string;
  }

  const item: Item = {
    _id: crypto.randomUUID(),
    name: isFile
      ? `file_${Math.floor(Math.random() * 1000)}.txt`
      : `folder_${Math.floor(Math.random() * 1000)}`,
    isFile,
    updatedAt: String(new Date(Date.now() - Math.floor(Math.random() * 1e10))),
  };

  if (isFile) {
    item.size = Math.floor(Math.random() * 5000) + 1; // random size in bytes
  }

  return item;
}

export function generateItems(count = 10) {
  return Array.from({ length: count }, () => randomItem());
}
