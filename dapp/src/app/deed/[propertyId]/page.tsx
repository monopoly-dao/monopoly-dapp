'use client';

import Image from 'next/image';
import { useParams } from 'next/navigation';
import { useEffect, useRef } from 'react';
import { ImSpinner2 } from 'react-icons/im';
import { useReactToPrint } from 'react-to-print';

import { useGetDeedDetailsQuery } from '@/api/deed';

import icon from '~/favicon/android-chrome-256x256.png';

export default function Page() {
  const pageRef = useRef<HTMLDivElement | null>(null);
  const { propertyId } = useParams();

  const {
    data: deedResponse,
    isLoading,
    isError,
  } = useGetDeedDetailsQuery({
    propertyId: propertyId as string,
  });

  const deedDetails = deedResponse?.data;

  const handlePrint = useReactToPrint({
    content: () => pageRef.current,
  });

  useEffect(() => {
    if (pageRef.current && !isLoading && deedDetails) {
      handlePrint();
    }
  }, [handlePrint, isLoading, deedDetails]);

  if (isLoading)
    return (
      <div className='w-full h-screen flex flex-col gap-4 items-center justify-center'>
        <ImSpinner2 className='animate-spin text-5xl' />
        <p>Please hold on while property deed gets generated</p>
      </div>
    );

  if (isError)
    return (
      <div className='w-full h-screen flex flex-col gap-4 items-center justify-center'>
        <p>Error generating property deed, please try again later</p>
      </div>
    );

  return (
    <div ref={pageRef} className='px-[7%] lg:px-[10%] py-10'>
      <div className='flex justify-center mb-10'>
        <Image src={icon} alt='Settley' width={100} height={100} />
      </div>

      <h1 className='text-3xl mb-5'>Settley Shared Deed v1</h1>

      <p>
        This Shared Deed Agreement ("this Agreement") is dated{' '}
        {new Date().toUTCString()} by and among Settley DAO, represented herein
        by its legal entity, Settley DAO LLC, a Wyoming limited liability
        company of the one part ("Settley", "the Company") AND the holders of
        the following Wallet addresses ("Token holder", "Token holders") of the
        second part:
      </p>

      <h2 className='text-xl mt-10'>Token Holders</h2>
      <ul className='list-disc pl-10'>
        {deedDetails?.onwerAddresses.map((address) => (
          <li key={address}>{address}</li>
        ))}
      </ul>

      <h2 className='text-xl mt-10'>Recitals</h2>
      <ol className='list-decimal pl-10'>
        <li>
          Settley DAO is a decentralized autonomous organization identified by{' '}
          {deedDetails?.propertyAddress} and constituted as a legal entity under
          the Laws of Wyoming for its Members' ownership and management of real
          property globally;
        </li>
        <li>
          The Parties of the second part wish to become DAO Members in order to
          purchase and manage through the DAO, the real property and
          improvements thereon located at {deedDetails?.propertyPhysicalAddress}
          , and more particularly described in Exhibit A, attached hereto and
          incorporated herein ("Property").
        </li>
        <li>
          The Parties of the second part desire to enter into this Agreement to
          (a) set forth each Token Holder's ownership percentage of the
          property, (b) define the terms that will govern their rights and
          responsibilities to each other and to others in relation to the
          property, and (c) define the role of the DAO legal entity in managing
          the ownership of the property.
        </li>
      </ol>

      <p className='mt-10 mb-5'>
        NOW THEREFORE, in consideration of the mutual covenants and conditions
        contained in this Agreement and for other good and valuable
        consideration, the receipt, adequacy, and sufficiency of which are
        hereby acknowledged, the parties agree as follows:
      </p>

      <h3 className='font-bold'>1. DAO Membership</h3>
      <p className='pl-10'>
        The token holders affirm that they have executed the Settley DAO
        Membership Agreement and acknowledge, agree, and understand that the
        Settley DAO Membership Agreement is an integral part of this Agreement
        and is thereby incorporated herein.
      </p>

      <h3 className='font-bold'>2. Property Holdings</h3>
      <p className='pl-10'>
        The ownership percentage held by each Token Holder is as follows:
      </p>
      <ul className='list-disc pl-10'>
        {deedDetails?.percentageHoldings.map((holding) => (
          <li key={holding.walletAddress}>
            {holding.walletAddress} — {holding.percentageHolding}%
          </li>
        ))}
      </ul>

      <h3 className='font-bold'>3. Physical Deed Custody</h3>
      <p className='pl-10'>
        The Parties agree that the physical deed for the property shall be held
        by [Insert name of Bank/Escrow Agent listed in the property file]
        ("Escrow") on such terms as are set forth in the escrow contract between
        Settley and the Escrow.
      </p>

      <h3 className='font-bold'>4. Nature of Relationship Between Parties</h3>
      <p className='pl-10'>
        4.1. Title Management and Contracting. The DAO shall be responsible for
        managing the title to the property through its title management system
        as defined in the Settley DAO operational Agreement.
      </p>

      <p className='pl-10'>
        4.2. Tenants in Common Relationship; No Partnership. The Token Holders
        each shall hold their respective undivided tenancy in common interests
        in the Property (the "Interests") as tenants-in-common. The Tenants in
        Common do not intend by this Agreement to create a partnership or joint
        venture among themselves, or any relationship other than as DAO Members
        as defined herein.
      </p>

      <p className='pl-10'>
        4.3. No Agency. No Token Holder is authorized to act as agent for, to
        act on behalf of, or to bind any other Token Holder.
      </p>

      <h3 className='font-bold'>5. Management</h3>
      <p className='pl-10'>
        The Token Holders are currently parties to a Property Management
        Agreement with respect to the Property with (Name of Property Manager)
        (the "Property Manager"). The Property Manager shall be the sole and
        exclusive manager of the Property during the term of the Property
        Management Agreement. The Agreement is incorporated herein.
      </p>

      <h3 className='font-bold'>6. Income and Liabilities</h3>
      <p className='pl-10'>
        Each Token Holder shall be entitled to all benefits and obligations of
        ownership of the Property in proportion to their respective Interests.
        This includes all income, revenue, and sale proceeds, as well as
        liabilities and expenses of ownership.
      </p>

      <h3 className='font-bold'>7. Sale or Encumbrance of Property</h3>
      <p className='pl-10'>
        Major Decisions regarding the Property, as set forth in Exhibit D, shall
        require unanimous approval by the Tenants in Common.
      </p>

      <h3 className='font-bold'>8. Possession</h3>
      <p className='pl-10'>
        The Tenants in Common shall have a shared right of possession subject to
        the Agreement.
      </p>

      <h3 className='font-bold'>9. Right of Partition/Forced Sale</h3>
      <p className='pl-10'>
        Details regarding forced sales and partition to be included.
      </p>

      <h3 className='font-bold'>10. Code Deference</h3>
      <p className='pl-10'>More information about applicable codes.</p>

      <h3 className='font-bold'>11. General Provisions</h3>

      <p className='pl-10'>
        11.1. Mutuality; Reciprocity; Runs With the Land. All provisions of this
        Agreement are made for the direct, mutual, and reciprocal benefit of
        each party and shall run with the land.
      </p>

      <p className='pl-10'>
        11.2. Binding Arbitration. Binding arbitration applies to all disputes
        under this Agreement.
      </p>

      <p className='pl-10'>
        11.3. Attorneys' Fees. The prevailing party in any action or arbitration
        shall be entitled to recover attorneys' fees and costs.
      </p>

      <p className='pl-10'>
        11.4. Entire Agreement. This Agreement, together with the Property
        Management Agreement, constitutes the entire agreement between the
        parties.
      </p>

      <p className='pl-10'>
        11.5. Governing Law. This Agreement shall be governed by the laws of
        Wyoming.
      </p>

      <p className='pl-10'>
        11.6. Modification. No modification to this Agreement shall be valid
        unless in writing and signed by the party affected.
      </p>

      <p className='pl-10'>
        11.7. Notice and Payments. Notices and payments can be delivered in
        person or by certified mail.
      </p>

      <p className='pl-10'>
        11.8. Successors and Assigns. This Agreement shall bind and benefit the
        successors and assigns of the parties.
      </p>

      <p className='pl-10'>
        11.9. Term. This Agreement shall terminate when the Tenants in Common no
        longer own the Property.
      </p>

      <p className='pl-10'>
        11.10. Waivers. No waiver of any provision of this Agreement shall be
        valid unless in writing.
      </p>

      <p className='pl-10'>
        11.11. Counterparts. This Agreement may be executed in counterparts.
      </p>

      <p className='pl-10'>
        11.12. Severability. If any part of this Agreement is found to be
        illegal or void, the rest shall remain in effect.
      </p>

      <p className='pl-10'>
        11.13. Securities Laws. The Interests in the Property have not been
        registered under the Securities Act of 1933.
      </p>

      <p className='pl-10'>
        11.14. Time is of the Essence. Time is of the essence for all provisions
        of this Agreement.
      </p>

      <h2 className='text-xl mt-10'>Signature Pages</h2>
      <p>[SIGNATURE PAGES FOLLOW]</p>
    </div>
  );
}
