export const setFormValues = (setValue, userData) => {
    if (userData) {
      // Manually set each field individually or handle nested structures
      setValue('firstname', userData.firstname || '');
      setValue('lastname', userData.lastname || '');
      setValue('headline', userData.headline || '');
      setValue('industry', userData.industry || '');
      setValue('country', userData.country || '');
      setValue('city', userData.city || '');
      setValue('about', userData.about || '');
      setValue('pronouns', userData.pronouns || '');
      setValue('contact.phone', userData?.contact?.[0]?.phone || '');
      setValue('contact.address', userData?.contact?.[0]?.address || '');
      setValue('contact.month', userData?.contact?.[0]?.month || '');
      setValue('contact.year', userData?.contact?.[0]?.year || '');
      setValue('contact.day', userData?.contact?.[0]?.day || '');
    //   setValue('skills', userData.skills || ['skills']); // Ensure skills is an array
    //   setValue('education.school', userData.education?.school || '');
    //   setValue('education.degree', userData.education?.degree || '');
    // Add more fields as necessary
    }
  };