export const getCategoryStyles = (category) => {
    switch (category) {
        case 'Fiksi': return 'bg-green-100 text-green-800';
        case 'Non-Fiksi': return 'bg-blue-100 text-blue-800';
        case 'Fantasi': return 'bg-teal-100 text-teal-800';
        case 'Misteri': return 'bg-indigo-100 text-indigo-800';
        case 'Romansa': return 'bg-pink-100 text-pink-800';
        case 'Sains': return 'bg-purple-100 text-purple-800';
        case 'Sejarah': return 'bg-yellow-100 text-yellow-800';
        case 'Biografi': return 'bg-red-100 text-red-800';
        case 'Teknologi': return 'bg-cyan-100 text-cyan-800';
        case 'Bisnis': return 'bg-amber-100 text-amber-800';
        case 'Filsafat': return 'bg-gray-100 text-gray-800';
        case 'Psikologi': return 'bg-lime-100 text-lime-800';
        case 'Anak-Anak': return 'bg-orange-100 text-orange-800';
        case 'Petualangan': return 'bg-emerald-100 text-emerald-800';
        case 'Horor': return 'bg-violet-100 text-violet-800';
        default: return 'bg-gray-100 text-gray-800';
    }
};