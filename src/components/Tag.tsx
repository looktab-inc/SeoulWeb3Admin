type TagType = {
  text: string;
  // @ts-ignore
  onClick: (event, value) => void;
  selected: boolean;
  value: string|number;
}

const Tag = ({text, selected, onClick, value}: TagType) => {
  return (
    <button
      className={`px-4 py-3 rounded-[100px] shadow border 
      ${selected? 'bg-green-100 border-green-500' : 'bg-white border-zinc-400'}`}
      onClick={(e) => {onClick(e, value)}}
    >
      <div className={`text-[16px] font-bold ${selected? 'text-emerald-950' : 'text-zinc-800'}`}>{text}</div>
    </button>
  )
}

export default Tag