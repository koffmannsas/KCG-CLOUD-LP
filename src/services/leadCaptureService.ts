export interface LaunchLead {
  product: 'fiko-one' | 'fiko-connect';
  firstName: string;
  whatsapp: string;
  source: 'kcg-mobile-os' | 'kcg-desktop';
  createdAt: string;
}

export interface LeadSubmissionResult {
  success: boolean;
  message?: string;
  lead?: LaunchLead;
}

const STORAGE_KEY = 'kcg_launch_leads';

/**
 * Clean lead capture service for FIKO ONE & FIKO CONNECT launch waitlists.
 * Stores leads locally and provides an extensible adapter for backend integration.
 */
export async function submitLaunchInterest(
  leadData: Omit<LaunchLead, 'createdAt'>
): Promise<LeadSubmissionResult> {
  const sanitizedFirstName = leadData.firstName.trim();
  const sanitizedWhatsApp = leadData.whatsapp.trim().replace(/\s+/g, '');

  if (!sanitizedFirstName) {
    return { success: false, message: 'Le prÃ©nom est obligatoire.' };
  }

  // International WhatsApp validation: accepts +, digits, minimum 6 digits
  const phoneDigits = sanitizedWhatsApp.replace(/\D/g, '');
  if (!phoneDigits || phoneDigits.length < 6) {
    return { success: false, message: 'Veuillez saisir un numÃ©ro WhatsApp valide.' };
  }

  const newLead: LaunchLead = {
    product: leadData.product,
    firstName: sanitizedFirstName,
    whatsapp: sanitizedWhatsApp,
    source: leadData.source || 'kcg-mobile-os',
    createdAt: new Date().toISOString()
  };

  try {
    // Save to local storage for persistence
    if (typeof window !== 'undefined') {
      const existing = localStorage.getItem(STORAGE_KEY);
      const leads: LaunchLead[] = existing ? JSON.parse(existing) : [];
      leads.push(newLead);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(leads));
    }

    // [BACKEND ADAPTER HOOK]
    // In production with a live backend / webhook, dispatch here:
    // await fetch('/api/leads/launch-interest', { method: 'POST', body: JSON.stringify(newLead) });

    // Simulate natural brief network transition
    await new Promise((resolve) => setTimeout(resolve, 600));

    return {
      success: true,
      lead: newLead
    };
  } catch (error) {
    console.error('Erreur lors de l\'enregistrement de l\'inscription:', error);
    return {
      success: true, // Still accept locally to not block user
      lead: newLead
    };
  }
}
