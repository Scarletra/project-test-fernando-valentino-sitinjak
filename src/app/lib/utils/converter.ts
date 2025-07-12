export const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('id-ID', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
};

export const extractExcerpt = (content: string, maxLength: number = 100) => {
    const plainText = content.replace(/<[^>]*>/g, '');
    return plainText.length > maxLength 
      ? plainText.substring(0, maxLength) + '...'
      : plainText;
};

export const formatDateDisplay = (dateString: string) => {
    if (!dateString) return null;

    const date = new Date(dateString);
    const isValid = !isNaN(date.getTime());

    if (!isValid) return null;

    const day = date.getDate();
    const monthIndex = date.getMonth();
    const year = date.getFullYear();

    if (!day || isNaN(monthIndex) || !year) return null;

    const months = [
        'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
        'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
    ];

    const month = months[monthIndex]?.toUpperCase();
    if (!month) return null;

    return `${day} ${month} ${year}`;
};